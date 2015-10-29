
var _app = {
  db: new cStorage('todo'),
  init: function () {

    if (_app.db.isEmpty()) {
      _app.db.save({'list':[]});
    }

    this.eventListener();
    this.renderList();

  },
  eventListener: function () {

    $('#submitItem').on('click', function (e) {
      var val = $('#inputItem').val();
      if (val) {
        _app.addItem(val);
        $('#inputItem').val('');
      }
    });

  },
  renderList: function () {

    var ul = $('<ul>');
    _app.db.root('list').map(function (obj, key, value) {
      //console.log(value);
      var li = $('<li>');
      var text = $('<span>',{'class':'text','text':value.text});
      var done = $('<span>',{'class':'done'});
      done.on('click', function (e) {
        _app.removeItem(key);
      });
      ul.append(li.append(text,done));
    }, false);
    $('#list').html(ul);

  },
  addItem: function (value) {

    _app.db.root('list').add({'text':value});
    this.renderList();

  },
  removeItem: function (key) {

    _app.db.root('list.'+key).remove();
    this.renderList();

  }
};


$( document ).ready(function() {

  _app.init();

});
