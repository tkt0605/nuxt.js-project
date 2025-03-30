from haystack import indexes
from .models import Library, ToDOList

class LibraryIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name_plain = indexes.CharField(model_attr='name_plain')
    owner = indexes.CharField(model_attr='owner')
    # members = indexes.CharField(model_attr='members')
    goal = indexes.CharField(model_attr='goal', null=True)
    def get_model(self):
        return Library
    def index_queryset(self, using=None):
        return self.get_model().objects.all()

class ToDOListIndexes(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr="title", null=True)
    todo = indexes.CharField(model_attr='todo')
    created_at = indexes.DateTimeField(model_attr='created_at')

    def get_model(self):
        return ToDOList
