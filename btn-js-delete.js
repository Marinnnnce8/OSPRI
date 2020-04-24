var $nb = NB.util,
  $uk = UIkit.util,
  theme = {
    init: function () {
      this.ga(), this.blocks(), this.toggleBurgerMenuClass();
      var ospriBtns = document.getElementsByClassName("uk-button");
      for (var i = 0; i < ospriBtns.length; i++) {
        this.buttonHover(ospriBtns[i]);
      }
    },
    ga: function () {
      var a = $nb.$("ga", "[data]");
      if (a) {
        var t = $nb.data(a, "ga");
        $uk.isObject(t) &&
          ($uk.isObject(t.options) || (t.options = {}),
          (window.dataLayer = window.dataLayer || []),
          e("js", new Date()),
          e("config", t.id, t.options));
      }
      function e() {
        dataLayer.push(arguments);
      }
    },
    blocks: function () {
      var i = ["uk-table", "uk-table-justify"],
        o = ["left", "right", "center"],
        u = {
          pdf: ["pdf"],
          word: ["doc", "docx"],
          excel: ["xls", "xlsx"],
          powerpoint: ["ppt", "pptx"],
          archive: ["zip", "tar"],
        };
      $nb.$$("nb-block").forEach(function (a) {
        switch ($uk.data(a, "nb-block")) {
          case "content":
            for (var t in ($uk.$$("table", a).forEach(function (a) {
              $uk.addClass(a, i),
                $uk.wrapAll(a, "<div class='uk-overflow-auto'>");
            }),
            $uk
              .$$("a[href]", a)
              .filter(function (a) {
                return $uk.attr(a, "href").match(/\.(jpg|jpeg|png|gif|webp)/i);
              })
              .forEach(function (a) {
                var t = a.parentNode,
                  e = $uk.$("figcaption", t);
                UIkit.lightbox(t, { animation: "fade" }),
                  e && $uk.attr(a, "data-caption", $uk.html(e));
                for (var n = 0; n < o.length; n++) {
                  var r = o[n];
                  $uk.hasClass(t, "align_" + r) &&
                    UIkit.scrollspy(t, {
                      cls:
                        "uk-animation-slide-" +
                        ("center" == r ? "bottom" : r) +
                        "-small",
                    });
                }
              }),
            u))
              for (var e = u[t], n = 0; n < e.length; n++) {
                var r = $uk.$$(
                  "a[href$='." +
                    e[n] +
                    "']:not(.nb-file-icon):not(.nb-no-icon)",
                  a
                );
                r.length &&
                  r.forEach(function (a) {
                    $uk.prepend(
                      a,
                      $nb.ukIcon(
                        "pdf" == t
                          ? "file-pdf"
                          : "archive" == t
                          ? "album"
                          : "file-text"
                      )
                    ),
                      $uk.addClass(a, "nb-file-icon nb-file-icon-" + t);
                  });
              }
            break;
          case "embed":
            $uk.$$("iframe", a).forEach(function (a) {
              $uk.attr(a, "data-uk-responsive", !0);
            }),
              UIkit.update();
        }
      });
    },
    toggleBurgerMenuClass: function () {
      var burgerBtn = document.getElementsByClassName("js-burger-menu")[0];
      var burgerBtnActive = "burger-menu-active";

      burgerBtn.addEventListener("click", function () {
        this.classList.toggle(burgerBtnActive);
      });
    },
    buttonHover: function (obj) {
      obj.onmousemove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;

        e.target.style.setProperty("--x", `${x}px`);
        e.target.style.setProperty("--y", `${y}px`);
      };
    },
  };
function renderItems(a, t) {
  for (
    var e = "",
      n = ["uk-grid-match", "uk-child-width-1-2@s"],
      r = $nb.ukWidths(n),
      i = 0;
    i < a.length;
    i++
  ) {
    var o = a[i],
      u = $nb.wrap(
        $nb.wrap(o.title, { href: o.url, class: "uk-link-reset" }, "a"),
        { class: ["uk-card-title", "uk-margin-remove-bottom"] },
        "h3"
      ),
      c = o.getImage
        ? $nb.img(
            o.getImage,
            { alt: o.title, sizes: !!r.length && r.join(", ") },
            { "uk-img": { target: "!* +*" } }
          )
        : "",
      l = o.getSummary ? $nb.wrap(o.getSummary, "p") : "",
      d = $nb.wrap(
        t.more ? t.more : $nb.ukIcon("more"),
        { href: o.url, class: ["uk-button", "uk-button-text"] },
        "a"
      );
    e += $nb.wrap(
      $nb.wrap(
        (c
          ? $nb.wrap($nb.wrap(c, { href: o.url }, "a"), "uk-card-media-top")
          : "") +
          $nb.wrap(
            u +
              (o.date_pub ? $nb.wrap(o.date_pub, "uk-text-meta") : "") +
              (o.dates ? $nb.wrap(o.dates, "uk-text-meta") : "") +
              (o.location ? $nb.wrap(o.location, "uk-text-meta") : ""),
            "uk-card-header"
          ) +
          (l ? $nb.wrap(l, "uk-card-body") : "") +
          $nb.wrap(d, "uk-card-footer"),
        "uk-card uk-card-default"
      ),
      "div"
    );
  }
  return $nb.wrap(
    e,
    {
      class: n,
      "data-uk-grid": !0,
      "data-uk-scrollspy": {
        target: "> div",
        cls: "uk-animation-slide-bottom-small",
        delay: NB.options.speed,
      },
    },
    "div"
  );
}
$uk.ready(function () {
  theme.init();
});
