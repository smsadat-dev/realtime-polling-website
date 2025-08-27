from django.db import models

from .poll import Poll, Choice

# Vote model

class Vote(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='votes')
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='votes_set')

    # voter identifier (anonymous voter)
    visitor_id = models.CharField(max_length=64) # from FingerprintJS
    visitor_ip = models.GenericIPAddressField()  # track voter IP

    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta: 
        unique_together = ('poll', 'visitor_id') # one vote per poll per fingerprint

    def __str__(self) -> str:
        return f"ID: {self.visitor_id} from IP: {self.visitor_ip} Voted {self.choice}"