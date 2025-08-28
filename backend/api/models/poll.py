from django.db import models
from django.db.models import Sum
from django.utils import timezone

def one_day_hence():
    return timezone.now() + timezone.timedelta(days=3) # 3 days time by default


# Poll model

class Poll(models.Model):
    question = models.CharField(max_length=1000)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    ends_at = models.DateTimeField(default=one_day_hence) # 3 days time by default

    def __str__(self) -> str:
        return self.question
    
    @property
    def is_active(self):
        # returns true (active status) if poll set to forever or current time is behind end time
        return not self.ends_at or timezone.now() < self.ends_at
    
    def get_total_votes(self):
        return self.choices.aggregate(total=Sum('votes'))['total'] or 0 # type: ignore
    
class Choice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices")
    option = models.CharField(max_length=500)
    votes = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.poll.question} → {self.option}"