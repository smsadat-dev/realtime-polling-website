import json


from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from django.http import JsonResponse
from django.utils import timezone

from api.models.poll import Poll
from api.models.vote import Choice

# impose hard limit over poll duration
def timeLimit(self):
        
    if self.ends_at: 
        max_duration = timezone.now() + timezone.timedelta(days=5) # no poll allowed over 5 days
        if self.ends_at > max_duration:
            return JsonResponse({'status': 'error', 'message': "Poll duration shouldn\'t exceed 5 days"})
        

class PollConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        
        if not text_data:
            # Return JSON response
            await self.send(text_data=json.dumps({'type': '', 'payload': 'No data found'}))     
            return       
        
        data = json.loads(text_data)
        choice_id = data.get('choice_id')

        try:
            choice = await database_sync_to_async(Choice.objects.get)(id=choice_id)
            choice.votes += 1
            poll = await database_sync_to_async(lambda: choice.poll)() 
            
            await database_sync_to_async(choice.save)()
            total_votes = await database_sync_to_async(poll.get_total_votes)()

            # prepare vote data for all choices
            choices_data = await database_sync_to_async(
                lambda: [
                    {'id': c.id, 'votes': c.votes}
                    for c in poll.choices.all()
            ])()

            
        except Choice.DoesNotExist:
            await self.send(text_data=json.dumps({'type': 'error', 'payload': 'Choice not found'}))
            return

        new_result = {
            'choices': choices_data, 
            'total_votes': total_votes,
        }

        # Return JSON response
        await self.send(text_data=json.dumps({'type': '', 'payload': new_result}))