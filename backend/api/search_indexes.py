from haystack import indexes
from .models import Library, ToDOList
# search_indexes.py または signals.py に記述してもOK
from haystack.signals import BaseSignalProcessor

class NonManagingSignalProcessor(BaseSignalProcessor):
    """
    Haystack にインデックスの作成・削除をさせないためのカスタムシグナルプロセッサ。
    これにより、事前に curl 等で作成した custom analyzer / mapping を保持できる。
    """

    def setup(self):
        # signals を接続しないことで save/delete 時の自動インデックス操作を無効化
        # また、rebuild_index 時にも index 作成処理が呼ばれないようになる
        pass

    def teardown(self):
        # 接続解除も不要（setupで何もしていないため）
        pass

class LibraryIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    # text = indexes.CharField(document=True, use_template=True, analyzer='ngram_analyzer')
    name_plain = indexes.CharField(model_attr='name_plain')
    owner = indexes.CharField()
    goal = indexes.CharField(model_attr='goal', null=True)
    def get_model(self):
        return Library
    def prepare_owner(self, obj):
        return obj.owner.code_name if obj.owner else ""

    def index_queryset(self, using=None):
        return self.get_model().objects.all()

class ToDOListIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    # text = indexes.CharField(document=True, use_template=True, analyzer='ngram_analyzer')
    title = indexes.CharField(model_attr="title", null=True)
    todo = indexes.CharField(model_attr='todo')
    created_at = indexes.DateTimeField(model_attr='created_at')

    def get_model(self):
        return ToDOList
    def index_queryset(self, using=None):
        return self.get_model().objects.all()
