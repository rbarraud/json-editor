JSONEditor.defaults.themes.bootstrap3_mobile = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += 'form-control';
    el.style.border = "thin dashed #b3b3b3";
    el.style.display = "block";
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += 'form-control';
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');
    var p = document.createElement('p');
    p.appendChild(input);

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    if(label && input.type === 'checkbox') {
      group.className += ' todo animated fadeinup delay-1';
      p.className += ' todo-element';
      p.appendChild(label);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      input.style.position = 'left';
      input.style.cssFloat = 'left';
      group.appendChild(p);
      input.setAttribute('id', text);
      label.setAttribute('for', text);
      input.setAttribute('onclick', 'if (this.readOnly) this.checked=this.readOnly=false; else if (!this.checked) this.readOnly=this.indeterminate=true;');
      if(input.value===null){
        input.indeterminate = true;
      }
    } 
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        label.style.fontSize = '16px';
        label.style.color = '#333333';
        group.appendChild(p);
        group.appendChild(label);
      }
      if(input.type === 'textbox' || input.type === 'text' || input.type === 'number' || input.type === 'textarea'){
        input.style.border = "thin dashed #b3b3b3";
        input.style.display = "block !important";
        input.placeholder = "Tap here to enter information";
      }
      group.appendChild(p);
    }

    if(description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
    el.style.paddingBottom = 0;
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.innerHTML = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('a');
    el.className = 'list-group-item';
    el.setAttribute('href','#');
    el.appendChild(text);
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  getProgressBar: function() {
    var min = 0, max = 100, start = 0;

    var container = document.createElement('div');
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', start);
    bar.setAttribute('aria-valuemin', min);
    bar.setAttribute('aria-valuenax', max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute('aria-valuenow', progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.className = 'progress progress-striped active';
    bar.removeAttribute('aria-valuenow');
    bar.style.width = '100%';
    bar.innerHTML = '';
  }
});
