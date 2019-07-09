(function() {
  var style = `
    .browser {
      position: fixed;
      top: 0;
      right: 0;
      width: 375px;
      height: 667px;
      background: #fff;
      border: 3px solid #ccc;
      border-radius: 10px 0 0 10px;
      padding-bottom: 10px;
      max-height: 100vh;
      z-index: 2;
      transition: all .3s
    }
    .browser-iframe {
      width: 100%;
      height: calc(100% - 35px);
      padding: 5px;
      box-sizing: border-box;
    }
    .browser.browser-fold {
      height: 20px;
      width: 30px;
      overflow: hidden;
      position: fixed;
      top: 60px;
      right: 0;
      border: none;
      text-align: center;
    }
    .browser.browser-fold .btn-group,
    .browser.browser-fold .browser-iframe {
      display: none
    }
    .browser > .el-icon-s-help {
      display: none;
    }
    .browser.browser-fold > .el-icon-s-help {
      display: inline;
    }
    .browser-fold > .el-icon-s-help {
      font-size: 20px;
      cursor: pointer;
    }
    .browser-fold > .el-icon-s-help:hover {
      color: #00b4d4;
    }
    .btn-group {
      margin: 15px;
    }
    .btn-group > .el-icon-loading {
      float: right;
      font-size: 20px;
      font-weight: bold;
    }
    .hidden {
      display: none;
    }
    .btn {
      width: 16px;
      height: 16px;
      border-radius: 16px;
      display: inline-block;
      background: red;
      line-height: 15px;
      vertical-align: top;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }
    .btn:not(first-child) {
      margin-left: 10px;
    }
    .btn-del {
      background-color: #ff5f58
    }
    .btn-fold {
      background-color: #ffbd2e
    }
    .btn-expand {
      background-color: #28c941
    }`

  var html =
    `<div class="browser browser-fold">
      <i class="el-icon-s-help" title="browser"></i>
      <div class="btn-group">
        <i class="btn btn-del">x</i>
        <i class="btn btn-fold">-</i>
        <i class="btn btn-expand">+</i>
        <i class="el-icon-loading hidden"></i>
      </div>
      <iframe class="browser-iframe" frameborder="0">
      </iframe>
    </div>`

    var sheet = document.createElement('style');
    sheet.innerHTML = style;
    document.body.appendChild(sheet);

    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    $('.el-table__body-wrapper').on('click', '.el-table__row', function (e) {
      if (e.metaKey) {
        const href = $(e.currentTarget).find('a').get(0).href
        $('.browser-iframe').attr('src', href)
        $('.btn-group > .el-icon-loading').css('display', 'inline')
      }
    })
    $('.btn-group').on('click', '.btn', function (e) {
      const className = $(e.currentTarget).attr('class')
      const type = className.slice(8)
      switch (type) {
        case 'del':
          $('.browser').addClass('browser-fold')
          break
        case 'fold':
          $('.browser').addClass('browser-fold')
          break
        case 'expand':
          window.open($('.browser-iframe').attr('src'))
          break
      }
    })
    $('.browser > .el-icon-s-help').on('click', function (e) {
      $('.browser').removeClass('browser-fold')
    })
    $('.browser-iframe').on('load', function () {
      $('.btn-group > .el-icon-loading').css('display', 'none')
    })
})();
