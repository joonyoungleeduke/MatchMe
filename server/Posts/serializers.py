from Posts.models import Post, Comment, UserHeart, UserMatch 
from rest_framework import serializers 
from django.conf import settings 

POST_ACTIONS = settings.POST_ACTIONS


# class UserMatch(models.Model):

#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usermatch')
#     match_post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name='usermatch')
#     created = models.DateTimeField(auto_now_add=True)

# class UserHeart(models.Model):

#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
#     post = models.ForeignKey("Post", on_delete = models.CASCADE, related_name='+')
#     created = models.DateTimeField(auto_now_add=True)



class HeartSerializer(serializers.ModelSerializer):
    class Meta: 
        model = UserHeart 
        fields = ['author', 'post']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMatch 
        fields = ['author', 'match_post']

class PostActionSerializer(serializers.Serializer):
    action = serializers.CharField() 

    def validate_action(self, value):
        if not isinstance(value, str): 
            return serializers.ValidationError("Action must be given in string.")
        value = value.lower().strip()
        if not value in POST_ACTIONS: 
            raise serializers.ValidationError("Not a valid action.")
        return value 

class PostSerializer(serializers.ModelSerializer):

    isMatch = serializers.BooleanField(required=False)
    goal = serializers.IntegerField(required=False)
    image = serializers.ImageField(required=False)
    link = serializers.CharField(required=False)

    class Meta: 
        model = Post 
        fields = ['id', 'content', 'group', 'author', 'isMatch', 'goal', 'image', 'link', 'reason']

    def match_post(self, obj):
        return obj.ismatch 
    
    def get_hearts(self, obj):
        return obj.hearts.count()
    
    def get_matches(self, obj):
        return obj.matches.count() 

    def match_reached(self, obj):
        return obj.matches.count() >= obj.goal 

class PostSendSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        fields = ['id', 'content', 'group', 'author', 'hearts', 'matches', 'isMatch', 'goal', 'image', 'link']

class CommentSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Comment 
        fields = ['id', 'content', 'post', 'author']    

class NumberSerializer(serializers.Serializer):

    number = serializers.IntegerField() 