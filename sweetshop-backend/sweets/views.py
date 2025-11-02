from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Sweet
from .serializers import SweetSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


class RegisterView(generics.CreateAPIView):
    """
    This view handles the creation of a new user.
    """
    queryset = User.objects.all()  
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class SweetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update`, and `destroy` actions for the Sweet model.
    """
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    
    # This is the default permission for the main endpoints (list, retrieve, etc.)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        Admin users are required for 'destroy' and 'update'.
        """
        if self.action == 'destroy' or self.action == 'update' or self.action == 'partial_update':
            # Only admin can delete or update sweets 
            return [IsAdminUser()] 
        return super().get_permissions()

    # --- NEW ACTION: PURCHASE ---
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def purchase(self, request, pk=None):
        """
        Purchase a sweet, decreasing its quantity by 1. 
        """
        sweet = self.get_object()
        if sweet.quantity > 0:
            sweet.quantity -= 1
            sweet.save()
            serializer = self.get_serializer(sweet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'This sweet is out of stock.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    # --- NEW ACTION: RESTOCK ---
    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def restock(self, request, pk=None):
        """
        Restock a sweet, increasing its quantity. 
        Expects a JSON body like: { "quantity": 25 }
        """
        sweet = self.get_object()
        
        try:
            # Get the quantity from the request's JSON body
            amount = int(request.data.get('quantity', 0))
        except ValueError:
            return Response(
                {'error': 'Invalid quantity. Must be an integer.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if amount <= 0:
             return Response(
                {'error': 'Restock quantity must be a positive number.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sweet.quantity += amount
        sweet.save()
        serializer = self.get_serializer(sweet)
        return Response(serializer.data, status=status.HTTP_200_OK)