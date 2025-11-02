from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Sweet  # Import the Sweet model

# === Serializer for User Registration ===
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email') # You can add 'first_name', 'last_name' if you want

    def create(self, validated_data):
        # Use create_user to properly hash the password
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '') # Get email if provided, otherwise default to empty string
        )
        return user


# === Serializer for the Sweet Model ===
class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        # These are the fields that will be sent to/from your API
        fields = ('id', 'name', 'category', 'price', 'quantity')