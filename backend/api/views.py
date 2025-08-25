from django.shortcuts import render 
from django.http import JsonResponse

# Poll backend view

def pollmanage(request):

    if request.method == 'POST':
        return JsonResponse({'status': 'success', 'message': 'Recieved poll request'}, status=200)
    else: 
        return JsonResponse({'status': 'success', 'message': 'This is the poll backend endpoint'}, status=200)
    