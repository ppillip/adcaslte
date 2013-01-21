qmad.br_navigator = navigator.userAgent.indexOf("Netscape") + 1;
qmad.br_version = parseFloat(navigator.vendorSub);
qmad.br_oldnav = qmad.br_navigator && qmad.br_version < 7.1;
qmad.tree = new Object();
if (qmad.bvis.indexOf("qm_tree_item_click(b.cdiv);") == -1) {
    qmad.bvis += "qm_tree_item_click(b.cdiv);";
    qm_tree_init_styles();
}
if (window.attachEvent) window.attachEvent("onload", qm_tree_init);
else
    if (window.addEventListener) window.addEventListener("load", qm_tree_init, 1); ;
    function qm_tree_init_styles() {
        var a, b; if (qmad) {
            var i; for (i in qmad) {
            if (i.indexOf("qm") != 0 || i.indexOf("qmv") + 1) continue; var ss = qmad[i];
            if (ss && ss.tree_width) {
                var az = ""; if (window.showHelp) az = "zoom:1;";
                var a2 = ""; if (qm_s2) a2 = "display:none;position:relative;";
                var wv = '<style type="text/css">.qmistreestyles' + i + '{} #' + i + '{position:relative !important;} #' + i + ' a{float:none !important;white-space:normal !important;}#' + i + ' div{width:auto !important;left:0px !important;top:0px !important;overflow:hidden;' + a2 + az + 'border-top-width:0px !important;border-bottom-width:0px !important;margin-left:0px !important;margin-top:0px !important;}'; wv += '#' + i + '{width:' + ss.tree_width + 'px;}';
                if (ss.tree_sub_sub_indent) wv += '#' + i + ' div div{padding-left:' + ss.tree_sub_sub_indent + 'px}';
                document.write(wv + '</style>');
            } 
        } 
    } 
};
function qm_tree_init(event, spec) {
    var q = qmad.tree; var a, b; var i;
    for (i in qmad) {
        if (i.indexOf("qm") != 0 || i.indexOf("qmv") + 1 || (!isNaN(spec) && spec != i)) continue;
        var ss = qmad[i]; if (ss && ss.tree_width) {
            q.estep = ss.tree_expand_step_size;
            if (!q.estep) q.estep = 1; q.cstep = ss.tree_collapse_step_size;
            if (!q.cstep) q.cstep = 1; q.acollapse = ss.tree_auto_collapse; q.no_focus = ss.tree_hide_focus_box; q.etype = ss.tree_expand_animation;
            if (q.etype) q.etype = parseInt(q.etype); 
            if (!q.etype) q.etype = 0; q.ctype = ss.tree_collapse_animation;
            if (q.ctype) q.ctype = parseInt(q.ctype);
            if (!q.ctype) q.ctype = 0;
            if (qmad.br_oldnav) { q.etype = 0; q.ctype = 0; }
            qm_tree_init_items(document.getElementById(i));
        } i++;
    } 
};
function qm_tree_init_items(a, sub) {
    var w, b;
    var q = qmad.tree;
    var aa; aa = a.childNodes;
    for (var j = 0; j < aa.length; j++) {
        if (aa[j].tagName == "A") {
            if (aa[j].cdiv) {
                aa[j].cdiv.ismove = 1; aa[j].cdiv.qmtree = 1;
            }
            if (!aa[j].onclick) { aa[j].onclick = aa[j].onmouseover; aa[j].onmouseover = null; }
            if (q.no_focus) {
                aa[j].onfocus = function() {
                this.blur();
            };
        }
        if (aa[j].cdiv)
            new qm_tree_init_items(aa[j].cdiv, 1);
        if (aa[j].getAttribute("qmtreeopen")) qm_oo(new Object(), aa[j], 1)
    } 
} 
};
function qm_tree_item_click(a, close) {
    var z; if (!a.qmtree && !((z = window.qmv) && z.loaded)) {
        var id = qm_get_menu(a).id;
        if (window.qmad && qmad[id] && qmad[id].tree_width) x2("qmfh", a, 1); return;
    } if ((z = window.qmv) && (z = z.addons) && (z = z.tree_menu) && !z["on" + qm_index(a)]) return; x2("qmfh", a); var q = qmad.tree; if (q.timer) return; q.co = new Object(); var levid = "a" + qm_get_level(a); var ex = false; var cx = false; if (q.acollapse) {
    var mobj = qm_get_menu(a); var ds = mobj.getElementsByTagName("DIV"); for (var i = 0; i < ds.length; i++) {
        if (ds[i].style.position == "relative" && ds[i] != a) {
            var go = true; var cp = a[qp]; while (!qm_a(cp)) { if (ds[i] == cp) go = false; cp = cp[qp]; } if (go) {
                cx = true; q.co["a" + i] = ds[i]; qm_uo(ds[i], 1);
            }
        } 
        }
     }
     if (a.style.position == "relative") {
         cx = true; q.co["b"] = a; var d = a.getElementsByTagName("DIV"); for (var i = 0; i < d.length; i++) {
         if (d[i].style.position == "relative") { q.co["b" + i] = d[i]; qm_uo(d[i], 1); } 
     } a.qmtreecollapse = 1; qm_uo(a, 1); if (window.qm_ibullets_hover) qm_ibullets_hover(null, a.idiv);
 } else {
     ex = true;
     if (qm_s2) a.style.display = "block";
     a.style.position = "relative";
     q.eh = a.offsetHeight; 
     a.style.height = "0px";
     x2("qmfv", a, 1);
     x2("qmfh", a);
     a.qmtreecollapse = 0; q.eo = a;
 }
    qmwait = true; 
    qm_tree_item_expand(ex, cx, levid);
}; 
function qm_tree_item_expand(expand, collapse, levid) {
    var q = qmad.tree; var go = false; var cs = 1;
    if (collapse) {
        for (var i in q.co) {
            if (!q.co[i].style.height && q.co[i].style.position == "relative")
             {
                 q.co[i].style.height = (q.co[i].offsetHeight) + "px";
                 q.co[i].qmtreeht = parseInt(q.co[i].style.height);
             } 
            cs = parseInt((q.co[i].offsetHeight / parseInt(q.co[i].qmtreeht)) * q.cstep);
            if (q.ctype == 1) cs = q.cstep - cs + 1; 
            else if (q.ctype == 2) cs = cs + 1;
            else if (q.ctype == 3) cs = q.cstep;
            if (q.ctype && parseInt(q.co[i].style.height) - cs > 0) { q.co[i].style.height = parseInt(q.co[i].style.height) - cs + "px"; go = true; }
            else {
                q.co[i].style.height = ""; q.co[i].style.position = "";
                if (qm_s2) q.co[i].style.display = ""; x2("qmfh", q.co[i], 1); x2("qmfv", q.co[i]);
            } 
        } 
    }
    if (expand) {
        cs = parseInt((q.eo.offsetHeight / q.eh) * q.estep);
        if (q.etype == 2) cs = q.estep - cs; else if (q.etype == 1) cs = cs + 1;
        else if (q.etype == 3) cs = q.estep;
        if (q.etype && q.eo.offsetHeight < (q.eh - cs)) {
            q.eo.style.height = parseInt(q.eo.style.height) + cs + "px"; go = true;
            if (window.qmv_position_pointer) qmv_position_pointer();
        }
        else {
            q.eo.qmtreeh = q.eo.style.height; q.eo.style.height = "";
            if (window.qmv_position_pointer) qmv_position_pointer();
        } 
    }
    if (go) { q.timer = setTimeout("qm_tree_item_expand(" + expand + "," + collapse + ",'" + levid + "')", 10); }
    else 
    {
        qmwait = false;
        q.timer = null;
    } 
}; 
function qm_get_level(a) {
    lev = 0;
    while (!qm_a(a) && (a = a[qp])) lev++; 
return lev; }; 
function qm_get_menu(a) {
    while (!qm_a(a) && (a = a[qp])) continue; 
    return a;
    }