/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function In(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(","))
    t[s] = 1;
  return (s) => s in t;
}
const de = {}, kt = [], Je = () => {
}, Hi = () => !1, Ls = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ps = (e) => e.startsWith("onUpdate:"), _e = Object.assign, On = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, _o = Object.prototype.hasOwnProperty, oe = (e, t) => _o.call(e, t), V = Array.isArray, jt = (e) => fs(e) === "[object Map]", Wi = (e) => fs(e) === "[object Set]", Gn = (e) => fs(e) === "[object Date]", G = (e) => typeof e == "function", me = (e) => typeof e == "string", We = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", Vi = (e) => (le(e) || G(e)) && G(e.then) && G(e.catch), Ki = Object.prototype.toString, fs = (e) => Ki.call(e), yo = (e) => fs(e).slice(8, -1), Ui = (e) => fs(e) === "[object Object]", Ns = (e) => me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yt = /* @__PURE__ */ In(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Rs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, bo = /-\w/g, qe = Rs(
  (e) => e.replace(bo, (t) => t.slice(1).toUpperCase())
), So = /\B([A-Z])/g, Lt = Rs(
  (e) => e.replace(So, "-$1").toLowerCase()
), Ji = Rs((e) => e.charAt(0).toUpperCase() + e.slice(1)), qs = Rs(
  (e) => e ? `on${Ji(e)}` : ""
), nt = (e, t) => !Object.is(e, t), Ys = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, qi = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, xo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Co = (e) => {
  const t = me(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Xn;
const Ds = () => Xn || (Xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function St(e) {
  if (V(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = me(n) ? Ao(n) : St(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (me(e) || le(e))
    return e;
}
const wo = /;(?![^(]*\))/g, To = /:([^]+)/, Eo = /\/\*[^]*?\*\//g;
function Ao(e) {
  const t = {};
  return e.replace(Eo, "").split(wo).forEach((s) => {
    if (s) {
      const n = s.split(To);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ot(e) {
  let t = "";
  if (me(e))
    t = e;
  else if (V(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ot(e[s]);
      n && (t += n + " ");
    }
  else if (le(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Io = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oo = /* @__PURE__ */ In(Io);
function Yi(e) {
  return !!e || e === "";
}
function Mo(e, t) {
  if (e.length !== t.length)
    return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = Mn(e[n], t[n]);
  return s;
}
function Mn(e, t) {
  if (e === t)
    return !0;
  let s = Gn(e), n = Gn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = We(e), n = We(t), s || n)
    return e === t;
  if (s = V(e), n = V(t), s || n)
    return s && n ? Mo(e, t) : !1;
  if (s = le(e), n = le(t), s || n) {
    if (!s || !n)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (l && !c || !l && c || !Mn(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Gi = (e) => !!(e && e.__v_isRef === !0), Se = (e) => me(e) ? e : e == null ? "" : V(e) || le(e) && (e.toString === Ki || !G(e.toString)) ? Gi(e) ? Se(e.value) : JSON.stringify(e, Xi, 2) : String(e), Xi = (e, t) => Gi(t) ? Xi(e, t.value) : jt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[Gs(n, r) + " =>"] = i, s),
    {}
  )
} : Wi(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Gs(s))
} : We(t) ? Gs(t) : le(t) && !V(t) && !Ui(t) ? String(t) : t, Gs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    We(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ce;
class Qi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ce && (Ce.active ? (this.parent = Ce, this.index = (Ce.scopes || (Ce.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ce === this)
        Ce = this.prevScope;
      else {
        let t = Ce;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Zi(e) {
  return new Qi(e);
}
function er() {
  return Ce;
}
function tr(e, t = !1) {
  Ce && Ce.cleanups.push(e);
}
let he;
const Xs = /* @__PURE__ */ new WeakSet();
class sr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Xs.has(this) && (Xs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ir(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Qn(this), rr(this);
    const t = he, s = Ye;
    he = this, Ye = !0;
    try {
      return this.fn();
    } finally {
      or(this), he = t, Ye = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ln(t);
      this.deps = this.depsTail = void 0, Qn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Xs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    hn(this) && this.run();
  }
  get dirty() {
    return hn(this);
  }
}
let nr = 0, Gt, Xt;
function ir(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xt, Xt = e;
    return;
  }
  e.next = Gt, Gt = e;
}
function $n() {
  nr++;
}
function Fn() {
  if (--nr > 0)
    return;
  if (Xt) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Gt; ) {
    let t = Gt;
    for (Gt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e)
    throw e;
}
function rr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function or(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), Ln(n), $o(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function hn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (lr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function lr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === is) || (e.globalVersion = is, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = he, n = Ye;
  he = e, Ye = !0;
  try {
    rr(e);
    const i = e.fn(e._value);
    (t.version === 0 || nt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    he = s, Ye = n, or(e), e.flags &= -3;
  }
}
function Ln(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      Ln(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function $o(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ye = !0;
const cr = [];
function rt() {
  cr.push(Ye), Ye = !1;
}
function ot() {
  const e = cr.pop();
  Ye = e === void 0 ? !0 : e;
}
function Qn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = he;
    he = void 0;
    try {
      t();
    } finally {
      he = s;
    }
  }
}
let is = 0;
class Fo {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Pn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!he || !Ye || he === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== he)
      s = this.activeLink = new Fo(he, this), he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, ar(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, is++, this.notify(t);
  }
  notify(t) {
    $n();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Fn();
    }
  }
}
function ar(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        ar(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Ss = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ Symbol(
  ""
), dn = /* @__PURE__ */ Symbol(
  ""
), rs = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, s) {
  if (Ye && he) {
    let n = Ss.get(e);
    n || Ss.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new Pn()), i.map = n, i.key = s), i.track();
  }
}
function ht(e, t, s, n, i, r) {
  const o = Ss.get(e);
  if (!o) {
    is++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ($n(), t === "clear")
    o.forEach(l);
  else {
    const c = V(e), f = c && Ns(s);
    if (c && s === "length") {
      const a = Number(n);
      o.forEach((h, p) => {
        (p === "length" || p === rs || !We(p) && p >= a) && l(h);
      });
    } else
      switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)), f && l(o.get(rs)), t) {
        case "add":
          c ? f && l(o.get("length")) : (l(o.get(Mt)), jt(e) && l(o.get(dn)));
          break;
        case "delete":
          c || (l(o.get(Mt)), jt(e) && l(o.get(dn)));
          break;
        case "set":
          jt(e) && l(o.get(Mt));
          break;
      }
  }
  Fn();
}
function Lo(e, t) {
  const s = Ss.get(e);
  return s && s.get(t);
}
function Pt(e) {
  const t = /* @__PURE__ */ re(e);
  return t === e ? t : (Ee(t, "iterate", rs), /* @__PURE__ */ De(e) ? t : t.map(Ge));
}
function ks(e) {
  return Ee(e = /* @__PURE__ */ re(e), "iterate", rs), e;
}
function et(e, t) {
  return /* @__PURE__ */ pt(e) ? Bt(/* @__PURE__ */ dt(e) ? Ge(t) : t) : Ge(t);
}
const Po = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qs(this, Symbol.iterator, (e) => et(this, e));
  },
  concat(...e) {
    return Pt(this).concat(
      ...e.map((t) => V(t) ? Pt(t) : t)
    );
  },
  entries() {
    return Qs(this, "entries", (e) => (e[1] = et(this, e[1]), e));
  },
  every(e, t) {
    return ct(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ct(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => et(this, n)),
      arguments
    );
  },
  find(e, t) {
    return ct(
      this,
      "find",
      e,
      t,
      (s) => et(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return ct(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ct(
      this,
      "findLast",
      e,
      t,
      (s) => et(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ct(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ct(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Zs(this, "includes", e);
  },
  indexOf(...e) {
    return Zs(this, "indexOf", e);
  },
  join(e) {
    return Pt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Zs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Wt(this, "pop");
  },
  push(...e) {
    return Wt(this, "push", e);
  },
  reduce(e, ...t) {
    return Zn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Zn(this, "reduceRight", e, t);
  },
  shift() {
    return Wt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Wt(this, "splice", e);
  },
  toReversed() {
    return Pt(this).toReversed();
  },
  toSorted(e) {
    return Pt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Pt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Wt(this, "unshift", e);
  },
  values() {
    return Qs(this, "values", (e) => et(this, e));
  }
};
function Qs(e, t, s) {
  const n = ks(e), i = n[t]();
  return n !== e && !/* @__PURE__ */ De(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = s(r.value)), r;
  }), i;
}
const No = Array.prototype;
function ct(e, t, s, n, i, r) {
  const o = ks(e), l = o !== e && !/* @__PURE__ */ De(e), c = o[t];
  if (c !== No[t]) {
    const h = c.apply(e, r);
    return l ? Ge(h) : h;
  }
  let f = s;
  o !== e && (l ? f = function(h, p) {
    return s.call(this, et(e, h), p, e);
  } : s.length > 2 && (f = function(h, p) {
    return s.call(this, h, p, e);
  }));
  const a = c.call(o, f, n);
  return l && i ? i(a) : a;
}
function Zn(e, t, s, n) {
  const i = ks(e), r = i !== e && !/* @__PURE__ */ De(e);
  let o = s, l = !1;
  i !== e && (r ? (l = n.length === 0, o = function(f, a, h) {
    return l && (l = !1, f = et(e, f)), s.call(this, f, et(e, a), h, e);
  }) : s.length > 3 && (o = function(f, a, h) {
    return s.call(this, f, a, h, e);
  }));
  const c = i[t](o, ...n);
  return l ? et(e, c) : c;
}
function Zs(e, t, s) {
  const n = /* @__PURE__ */ re(e);
  Ee(n, "iterate", rs);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ zs(s[0]) ? (s[0] = /* @__PURE__ */ re(s[0]), n[t](...s)) : i;
}
function Wt(e, t, s = []) {
  rt(), $n();
  const n = (/* @__PURE__ */ re(e))[t].apply(e, s);
  return Fn(), ot(), n;
}
const Ro = /* @__PURE__ */ In("__proto__,__v_isRef,__isVue"), ur = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(We)
);
function Do(e) {
  We(e) || (e = String(e));
  const t = /* @__PURE__ */ re(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class fr {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip")
      return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (i ? r ? Jo : gr : r ? pr : dr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = V(t);
    if (!i) {
      let c;
      if (o && (c = Po[s]))
        return c;
      if (s === "hasOwnProperty")
        return Do;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ve(t) ? t : n
    );
    if ((We(s) ? ur.has(s) : Ro(s)) || (i || Ee(t, "get", s), r))
      return l;
    if (/* @__PURE__ */ ve(l)) {
      const c = o && Ns(s) ? l : l.value;
      return i && le(c) ? /* @__PURE__ */ gn(c) : c;
    }
    return le(l) ? i ? /* @__PURE__ */ gn(l) : /* @__PURE__ */ js(l) : l;
  }
}
class hr extends fr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const o = V(t) && Ns(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ pt(r);
      if (!/* @__PURE__ */ De(n) && !/* @__PURE__ */ pt(n) && (r = /* @__PURE__ */ re(r), n = /* @__PURE__ */ re(n)), !o && /* @__PURE__ */ ve(r) && !/* @__PURE__ */ ve(n))
        return f || (r.value = n), !0;
    }
    const l = o ? Number(s) < t.length : oe(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ ve(t) ? t : i
    );
    return t === /* @__PURE__ */ re(i) && c && (l ? nt(n, r) && ht(t, "set", s, n) : ht(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = oe(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && ht(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!We(s) || !ur.has(s)) && Ee(t, "has", s), n;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      V(t) ? "length" : Mt
    ), Reflect.ownKeys(t);
  }
}
class ko extends fr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const jo = /* @__PURE__ */ new hr(), zo = /* @__PURE__ */ new ko(), Bo = /* @__PURE__ */ new hr(!0);
const pn = (e) => e, gs = (e) => Reflect.getPrototypeOf(e);
function Ho(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ re(i), o = jt(r), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, f = i[e](...n), a = s ? pn : t ? Bt : Ge;
    return !t && Ee(
      r,
      "iterate",
      c ? dn : Mt
    ), _e(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: p } = f.next();
          return p ? { value: h, done: p } : {
            value: l ? [a(h[0]), a(h[1])] : a(h),
            done: p
          };
        }
      }
    );
  };
}
function ms(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wo(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ re(r), l = /* @__PURE__ */ re(i);
      e || (nt(i, l) && Ee(o, "get", i), Ee(o, "get", l));
      const { has: c } = gs(o), f = t ? pn : e ? Bt : Ge;
      if (c.call(o, i))
        return f(r.get(i));
      if (c.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ re(i), "iterate", Mt), i.size;
    },
    has(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ re(r), l = /* @__PURE__ */ re(i);
      return e || (nt(i, l) && Ee(o, "has", i), Ee(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ re(l), f = t ? pn : e ? Bt : Ge;
      return !e && Ee(c, "iterate", Mt), l.forEach((a, h) => i.call(r, f(a), f(h), o));
    }
  };
  return _e(
    s,
    e ? {
      add: ms("add"),
      set: ms("set"),
      delete: ms("delete"),
      clear: ms("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ re(this), o = gs(r), l = /* @__PURE__ */ re(i), c = !t && !/* @__PURE__ */ De(i) && !/* @__PURE__ */ pt(i) ? l : i;
        return o.has.call(r, c) || nt(i, c) && o.has.call(r, i) || nt(l, c) && o.has.call(r, l) || (r.add(c), ht(r, "add", c, c)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ De(r) && !/* @__PURE__ */ pt(r) && (r = /* @__PURE__ */ re(r));
        const o = /* @__PURE__ */ re(this), { has: l, get: c } = gs(o);
        let f = l.call(o, i);
        f || (i = /* @__PURE__ */ re(i), f = l.call(o, i));
        const a = c.call(o, i);
        return o.set(i, r), f ? nt(r, a) && ht(o, "set", i, r) : ht(o, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ re(this), { has: o, get: l } = gs(r);
        let c = o.call(r, i);
        c || (i = /* @__PURE__ */ re(i), c = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return c && ht(r, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ re(this), r = i.size !== 0, o = i.clear();
        return r && ht(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    s[i] = Ho(i, e, t);
  }), s;
}
function Nn(e, t) {
  const s = Wo(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    oe(s, i) && i in n ? s : n,
    i,
    r
  );
}
const Vo = {
  get: /* @__PURE__ */ Nn(!1, !1)
}, Ko = {
  get: /* @__PURE__ */ Nn(!1, !0)
}, Uo = {
  get: /* @__PURE__ */ Nn(!0, !1)
};
const dr = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap();
function qo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return /* @__PURE__ */ pt(e) ? e : Rn(
    e,
    !1,
    jo,
    Vo,
    dr
  );
}
// @__NO_SIDE_EFFECTS__
function Yo(e) {
  return Rn(
    e,
    !1,
    Bo,
    Ko,
    pr
  );
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
  return Rn(
    e,
    !0,
    zo,
    Uo,
    gr
  );
}
function Rn(e, t, s, n, i) {
  if (!le(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = qo(yo(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? n : s
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function dt(e) {
  return /* @__PURE__ */ pt(e) ? /* @__PURE__ */ dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function De(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function zs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ re(t) : e;
}
function Dn(e) {
  return !oe(e, "__v_skip") && Object.isExtensible(e) && qi(e, "__v_skip", !0), e;
}
const Ge = (e) => le(e) ? /* @__PURE__ */ js(e) : e, Bt = (e) => le(e) ? /* @__PURE__ */ gn(e) : e;
// @__NO_SIDE_EFFECTS__
function ve(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function we(e) {
  return mr(e, !1);
}
// @__NO_SIDE_EFFECTS__
function mn(e) {
  return mr(e, !0);
}
function mr(e, t) {
  return /* @__PURE__ */ ve(e) ? e : new Go(e, t);
}
class Go {
  constructor(t, s) {
    this.dep = new Pn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ re(t), this._value = s ? t : Ge(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ De(t) || /* @__PURE__ */ pt(t);
    t = n ? t : /* @__PURE__ */ re(t), nt(t, s) && (this._rawValue = t, this._value = n ? t : Ge(t), this.dep.trigger());
  }
}
function ei(e) {
  e.dep && e.dep.trigger();
}
function te(e) {
  return /* @__PURE__ */ ve(e) ? e.value : e;
}
const Xo = {
  get: (e, t, s) => t === "__v_raw" ? e : te(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ ve(i) && !/* @__PURE__ */ ve(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function vr(e) {
  return /* @__PURE__ */ dt(e) ? e : new Proxy(e, Xo);
}
// @__NO_SIDE_EFFECTS__
function Qo(e) {
  const t = V(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = el(e, s);
  return t;
}
class Zo {
  constructor(t, s, n) {
    this._object = t, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = We(s) ? s : String(s), this._raw = /* @__PURE__ */ re(t);
    let i = !0, r = t;
    if (!V(t) || We(this._key) || !Ns(this._key))
      do
        i = !/* @__PURE__ */ zs(r) || /* @__PURE__ */ De(r);
      while (i && (r = r.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = te(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ ve(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ ve(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Lo(this._raw, this._key);
  }
}
function el(e, t, s) {
  return new Zo(e, t, s);
}
class tl {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Pn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = is - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return ir(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return lr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function sl(e, t, s = !1) {
  let n, i;
  return G(e) ? n = e : (n = e.get, i = e.set), new tl(n, i, s);
}
const vs = {}, xs = /* @__PURE__ */ new WeakMap();
let At;
function nl(e, t = !1, s = At) {
  if (s) {
    let n = xs.get(s);
    n || xs.set(s, n = []), n.push(e);
  }
}
function il(e, t, s = de) {
  const { immediate: n, deep: i, once: r, scheduler: o, augmentJob: l, call: c } = s, f = (x) => i ? x : /* @__PURE__ */ De(x) || i === !1 || i === 0 ? bt(x, 1) : bt(x);
  let a, h, p, m, v = !1, T = !1;
  if (/* @__PURE__ */ ve(e) ? (h = () => e.value, v = /* @__PURE__ */ De(e)) : /* @__PURE__ */ dt(e) ? (h = () => f(e), v = !0) : V(e) ? (T = !0, v = e.some((x) => /* @__PURE__ */ dt(x) || /* @__PURE__ */ De(x)), h = () => e.map((x) => {
    if (/* @__PURE__ */ ve(x))
      return x.value;
    if (/* @__PURE__ */ dt(x))
      return f(x);
    if (G(x))
      return c ? c(x, 2) : x();
  })) : G(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (p) {
      rt();
      try {
        p();
      } finally {
        ot();
      }
    }
    const x = At;
    At = a;
    try {
      return c ? c(e, 3, [m]) : e(m);
    } finally {
      At = x;
    }
  } : h = Je, t && i) {
    const x = h, P = i === !0 ? 1 / 0 : i;
    h = () => bt(x(), P);
  }
  const R = er(), k = () => {
    a.stop(), R && R.active && On(R.effects, a);
  };
  if (r && t) {
    const x = t;
    t = (...P) => {
      const Z = x(...P);
      return k(), Z;
    };
  }
  let D = T ? new Array(e.length).fill(vs) : vs;
  const N = (x) => {
    if (!(!(a.flags & 1) || !a.dirty && !x))
      if (t) {
        const P = a.run();
        if (x || i || v || (T ? P.some((Z, B) => nt(Z, D[B])) : nt(P, D))) {
          p && p();
          const Z = At;
          At = a;
          try {
            const B = [
              P,
              // pass undefined as the old value when it's changed for the first time
              D === vs ? void 0 : T && D[0] === vs ? [] : D,
              m
            ];
            D = P, c ? c(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            At = Z;
          }
        }
      } else
        a.run();
  };
  return l && l(N), a = new sr(h), a.scheduler = o ? () => o(N, !1) : N, m = (x) => nl(x, !1, a), p = a.onStop = () => {
    const x = xs.get(a);
    if (x) {
      if (c)
        c(x, 4);
      else
        for (const P of x)
          P();
      xs.delete(a);
    }
  }, t ? n ? N(!0) : D = a.run() : o ? o(N.bind(null, !0), !0) : a.run(), k.pause = a.pause.bind(a), k.resume = a.resume.bind(a), k.stop = k, k;
}
function bt(e, t = 1 / 0, s) {
  if (t <= 0 || !le(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ve(e))
    bt(e.value, t, s);
  else if (V(e))
    for (let n = 0; n < e.length; n++)
      bt(e[n], t, s);
  else if (Wi(e) || jt(e))
    e.forEach((n) => {
      bt(n, t, s);
    });
  else if (Ui(e)) {
    for (const n in e)
      bt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && bt(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function hs(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Bs(i, t, s);
  }
}
function Ve(e, t, s, n) {
  if (G(e)) {
    const i = hs(e, t, s, n);
    return i && Vi(i) && i.catch((r) => {
      Bs(r, t, s);
    }), i;
  }
  if (V(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Ve(e[r], t, s, n));
    return i;
  }
}
function Bs(e, t, s, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || de;
  if (t) {
    let l = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      rt(), hs(r, null, 10, [
        e,
        c,
        f
      ]), ot();
      return;
    }
  }
  rl(e, s, i, n, o);
}
function rl(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ie = [];
let Ze = -1;
const zt = [];
let yt = null, Dt = 0;
const _r = /* @__PURE__ */ Promise.resolve();
let Cs = null;
function ws(e) {
  const t = Cs || _r;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = Ze + 1, s = Ie.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = Ie[n], r = os(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function kn(e) {
  if (!(e.flags & 1)) {
    const t = os(e), s = Ie[Ie.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= os(s) ? Ie.push(e) : Ie.splice(ol(t), 0, e), e.flags |= 1, yr();
  }
}
function yr() {
  Cs || (Cs = _r.then(Sr));
}
function ll(e) {
  V(e) ? zt.push(...e) : yt && e.id === -1 ? yt.splice(Dt + 1, 0, e) : e.flags & 1 || (zt.push(e), e.flags |= 1), yr();
}
function ti(e, t, s = Ze + 1) {
  for (; s < Ie.length; s++) {
    const n = Ie[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Ie.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function br(e) {
  if (zt.length) {
    const t = [...new Set(zt)].sort(
      (s, n) => os(s) - os(n)
    );
    if (zt.length = 0, yt) {
      yt.push(...t);
      return;
    }
    for (yt = t, Dt = 0; Dt < yt.length; Dt++) {
      const s = yt[Dt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    yt = null, Dt = 0;
  }
}
const os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Sr(e) {
  const t = Je;
  try {
    for (Ze = 0; Ze < Ie.length; Ze++) {
      const s = Ie[Ze];
      s && !(s.flags & 8) && (s.flags & 4 && (s.flags &= -2), hs(
        s,
        s.i,
        s.i ? 15 : 14
      ), s.flags & 4 || (s.flags &= -2));
    }
  } finally {
    for (; Ze < Ie.length; Ze++) {
      const s = Ie[Ze];
      s && (s.flags &= -2);
    }
    Ze = -1, Ie.length = 0, br(), Cs = null, (Ie.length || zt.length) && Sr();
  }
}
let it = null, xr = null;
function Ts(e) {
  const t = it;
  return it = e, xr = e && e.type.__scopeId || null, t;
}
function Cr(e, t = it, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Is(-1);
    const r = Ts(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Ts(r), n._d && Is(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Ct(e, t, s, n) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let c = l.dir[n];
    c && (rt(), Ve(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), ot());
  }
}
function cl(e, t) {
  if (Me) {
    let s = Me.provides;
    const n = Me.parent && Me.parent.provides;
    n === s && (s = Me.provides = Object.create(n)), s[e] = t;
  }
}
function Qt(e, t, s = !1) {
  const n = Vn();
  if (n || Ft) {
    let i = Ft ? Ft._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && G(t) ? t.call(n && n.proxy) : t;
  }
}
function al() {
  return !!(Vn() || Ft);
}
const ul = /* @__PURE__ */ Symbol.for("v-scx"), fl = () => Qt(ul);
function $t(e, t, s) {
  return wr(e, t, s);
}
function wr(e, t, s = de) {
  const { immediate: n, deep: i, flush: r, once: o } = s, l = _e({}, s), c = t && n || !t && r !== "post";
  let f;
  if (as) {
    if (r === "sync") {
      const m = fl();
      f = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = Je, m.resume = Je, m.pause = Je, m;
    }
  }
  const a = Me;
  l.call = (m, v, T) => Ve(m, a, v, T);
  let h = !1;
  r === "post" ? l.scheduler = (m) => {
    Fe(m, a && a.suspense);
  } : r !== "sync" && (h = !0, l.scheduler = (m, v) => {
    v ? m() : kn(m);
  }), l.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, a && (m.id = a.uid, m.i = a));
  };
  const p = il(e, t, l);
  return as && (f ? f.push(p) : c && p()), p;
}
function hl(e, t, s) {
  const n = this.proxy, i = me(e) ? e.includes(".") ? Tr(n, e) : () => n[e] : e.bind(n, n);
  let r;
  G(t) ? r = t : (r = t.handler, s = t);
  const o = ds(this), l = wr(i, r.bind(n), s);
  return o(), l;
}
function Tr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
const dl = /* @__PURE__ */ Symbol("_vte"), Er = (e) => e.__isTeleport, ze = /* @__PURE__ */ Symbol("_leaveCb"), Vt = /* @__PURE__ */ Symbol("_enterCb");
function pl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return jn(() => {
    e.isMounted = !0;
  }), Nr(() => {
    e.isUnmounting = !0;
  }), e;
}
const je = [Function, Array], Ar = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: je,
  onEnter: je,
  onAfterEnter: je,
  onEnterCancelled: je,
  // leave
  onBeforeLeave: je,
  onLeave: je,
  onAfterLeave: je,
  onLeaveCancelled: je,
  // appear
  onBeforeAppear: je,
  onAppear: je,
  onAfterAppear: je,
  onAppearCancelled: je
}, Ir = (e) => {
  const t = e.subTree;
  return t.component ? Ir(t.component) : t;
}, gl = {
  name: "BaseTransition",
  props: Ar,
  setup(e, { slots: t }) {
    const s = Vn(), n = pl();
    return () => {
      const i = t.default && $r(t.default(), !0), r = i && i.length ? Or(i) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        s.subTree ? tt() : void 0
      );
      if (!r)
        return;
      const o = /* @__PURE__ */ re(e), { mode: l } = o;
      if (n.isLeaving)
        return en(r);
      const c = si(r);
      if (!c)
        return en(r);
      let f = vn(
        c,
        o,
        n,
        s,
        // #11061, ensure enterHooks is fresh after clone
        (h) => f = h
      );
      c.type !== Oe && ls(c, f);
      let a = s.subTree && si(s.subTree);
      if (a && a.type !== Oe && !It(a, c) && Ir(s).type !== Oe) {
        let h = vn(
          a,
          o,
          n,
          s
        );
        if (ls(a, h), l === "out-in" && c.type !== Oe)
          return n.isLeaving = !0, h.afterLeave = () => {
            n.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, a = void 0;
          }, en(r);
        l === "in-out" && c.type !== Oe ? h.delayLeave = (p, m, v) => {
          const T = Mr(
            n,
            a
          );
          T[String(a.key)] = a, p[ze] = () => {
            m(), p[ze] = void 0, delete f.delayedLeave, a = void 0;
          }, f.delayedLeave = () => {
            v(), delete f.delayedLeave, a = void 0;
          };
        } : a = void 0;
      } else
        a && (a = void 0);
      return r;
    };
  }
};
function Or(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Oe) {
        t = s;
        break;
      }
  }
  return t;
}
const ml = gl;
function Mr(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(t.type, n)), n;
}
function vn(e, t, s, n, i) {
  const {
    appear: r,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: c,
    onEnter: f,
    onAfterEnter: a,
    onEnterCancelled: h,
    onBeforeLeave: p,
    onLeave: m,
    onAfterLeave: v,
    onLeaveCancelled: T,
    onBeforeAppear: R,
    onAppear: k,
    onAfterAppear: D,
    onAppearCancelled: N
  } = t, x = String(e.key), P = Mr(s, e), Z = (A, H) => {
    A && Ve(
      A,
      n,
      9,
      H
    );
  }, B = (A, H) => {
    const q = H[1];
    Z(A, H), V(A) ? A.every((M) => M.length <= 1) && q() : A.length <= 1 && q();
  }, O = {
    mode: o,
    persisted: l,
    beforeEnter(A) {
      let H = c;
      if (!s.isMounted)
        if (r)
          H = R || c;
        else
          return;
      A[ze] && A[ze](
        !0
        /* cancelled */
      );
      const q = P[x];
      q && It(e, q) && q.el[ze] && q.el[ze](), Z(H, [A]);
    },
    enter(A) {
      if (P[x] === e)
        return;
      let H = f, q = a, M = h;
      if (!s.isMounted)
        if (r)
          H = k || f, q = D || a, M = N || h;
        else
          return;
      let se = !1;
      A[Vt] = (Le) => {
        se || (se = !0, Le ? Z(M, [A]) : Z(q, [A]), O.delayedLeave && O.delayedLeave(), A[Vt] = void 0);
      };
      const ye = A[Vt].bind(null, !1);
      H ? B(H, [A, ye]) : ye();
    },
    leave(A, H) {
      const q = String(e.key);
      if (A[Vt] && A[Vt](
        !0
        /* cancelled */
      ), s.isUnmounting)
        return H();
      Z(p, [A]);
      let M = !1;
      A[ze] = (ye) => {
        M || (M = !0, H(), ye ? Z(T, [A]) : Z(v, [A]), A[ze] = void 0, P[q] === e && delete P[q]);
      };
      const se = A[ze].bind(null, !1);
      P[q] = e, m ? B(m, [A, se]) : se();
    },
    clone(A) {
      const H = vn(
        A,
        t,
        s,
        n,
        i
      );
      return i && i(H), H;
    }
  };
  return O;
}
function en(e) {
  if (Hs(e))
    return e = xt(e), e.children = null, e;
}
function si(e) {
  if (!Hs(e))
    return Er(e.type) && e.children ? Or(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && G(s.default))
      return s.default();
  }
}
function ls(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ls(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function $r(e, t = !1, s) {
  let n = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = s == null ? o.key : String(s) + String(o.key != null ? o.key : r);
    o.type === Be ? (o.patchFlag & 128 && i++, n = n.concat(
      $r(o.children, t, l)
    )) : (t || o.type !== Oe) && n.push(l != null ? xt(o, { key: l }) : o);
  }
  if (i > 1)
    for (let r = 0; r < n.length; r++)
      n[r].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => _e({ name: e.name }, t, { setup: e }))()
  ) : e;
}
function Lr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ni(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Es = /* @__PURE__ */ new WeakMap();
function Zt(e, t, s, n, i = !1) {
  if (V(e)) {
    e.forEach(
      (T, R) => Zt(
        T,
        t && (V(t) ? t[R] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (es(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Zt(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Kn(n.component) : n.el, o = i ? null : r, { i: l, r: c } = e, f = t && t.r, a = l.refs === de ? l.refs = {} : l.refs, h = l.setupState, p = /* @__PURE__ */ re(h), m = h === de ? Hi : (T) => ni(a, T) ? !1 : oe(p, T), v = (T, R) => !(R && ni(a, R));
  if (f != null && f !== c) {
    if (ii(t), me(f))
      a[f] = null, m(f) && (h[f] = null);
    else if (/* @__PURE__ */ ve(f)) {
      const T = t;
      v(f, T.k) && (f.value = null), T.k && (a[T.k] = null);
    }
  }
  if (G(c)) {
    rt();
    try {
      hs(c, l, 12, [o, a]);
    } finally {
      ot();
    }
  } else {
    const T = me(c), R = /* @__PURE__ */ ve(c);
    if (T || R) {
      const k = () => {
        if (e.f) {
          const D = T ? m(c) ? h[c] : a[c] : v() || !e.k ? c.value : a[e.k];
          if (i)
            V(D) && On(D, r);
          else if (V(D))
            D.includes(r) || D.push(r);
          else if (T)
            a[c] = [r], m(c) && (h[c] = a[c]);
          else {
            const N = [r];
            v(c, e.k) && (c.value = N), e.k && (a[e.k] = N);
          }
        } else
          T ? (a[c] = o, m(c) && (h[c] = o)) : R && (v(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const D = () => {
          k(), Es.delete(e);
        };
        D.id = -1, Es.set(e, D), Fe(D, s);
      } else
        ii(e), k();
    }
  }
}
function ii(e) {
  const t = Es.get(e);
  t && (t.flags |= 8, Es.delete(e));
}
Ds().requestIdleCallback;
Ds().cancelIdleCallback;
const es = (e) => !!e.type.__asyncLoader, Hs = (e) => e.type.__isKeepAlive;
function vl(e, t) {
  Pr(e, "a", t);
}
function _l(e, t) {
  Pr(e, "da", t);
}
function Pr(e, t, s = Me) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Ws(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      Hs(i.parent.vnode) && yl(n, t, s, i), i = i.parent;
  }
}
function yl(e, t, s, n) {
  const i = Ws(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  zn(() => {
    On(n[t], i);
  }, s);
}
function Ws(e, t, s = Me, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...o) => {
      rt();
      const l = ds(s), c = Ve(t, s, e, o);
      return l(), ot(), c;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const gt = (e) => (t, s = Me) => {
  (!as || e === "sp") && Ws(e, (...n) => t(...n), s);
}, bl = gt("bm"), jn = gt("m"), Sl = gt(
  "bu"
), xl = gt("u"), Nr = gt(
  "bum"
), zn = gt("um"), Cl = gt(
  "sp"
), wl = gt("rtg"), Tl = gt("rtc");
function El(e, t = Me) {
  Ws("ec", e, t);
}
const Al = /* @__PURE__ */ Symbol.for("v-ndc");
function Rr(e, t, s, n) {
  let i;
  const r = s && s[n], o = V(e);
  if (o || me(e)) {
    const l = o && /* @__PURE__ */ dt(e);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ De(e), f = /* @__PURE__ */ pt(e), e = ks(e)), i = new Array(e.length);
    for (let a = 0, h = e.length; a < h; a++)
      i[a] = t(
        c ? f ? Bt(Ge(e[a])) : Ge(e[a]) : e[a],
        a,
        void 0,
        r && r[a]
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, r && r[l]);
  } else if (le(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, c) => t(l, c, void 0, r && r[c])
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        i[c] = t(e[a], a, c, r && r[c]);
      }
    }
  else
    i = [];
  return s && (s[n] = i), i;
}
const _n = (e) => e ? so(e) ? Kn(e) : _n(e.parent) : null, ts = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ _e(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _n(e.parent),
    $root: (e) => _n(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Bn(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      kn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ws.bind(e.proxy)),
    $watch: (e) => hl.bind(e)
  })
), tn = (e, t) => e !== de && !e.__isScriptSetup && oe(e, t), Il = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: r, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const p = o[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (tn(n, t))
          return o[t] = 1, n[t];
        if (i !== de && oe(i, t))
          return o[t] = 2, i[t];
        if (oe(r, t))
          return o[t] = 3, r[t];
        if (s !== de && oe(s, t))
          return o[t] = 4, s[t];
        yn && (o[t] = 0);
      }
    }
    const f = ts[t];
    let a, h;
    if (f)
      return t === "$attrs" && Ee(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (s !== de && oe(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      h = c.config.globalProperties, oe(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return tn(i, t) ? (i[t] = s, !0) : n !== de && oe(n, t) ? (n[t] = s, !0) : oe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: o }
  }, l) {
    let c;
    return !!(s[l] || e !== de && l[0] !== "$" && oe(e, l) || tn(t, l) || oe(r, l) || oe(n, l) || oe(ts, l) || oe(i.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : oe(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function ri(e) {
  return V(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let yn = !0;
function Ol(e) {
  const t = Bn(e), s = e.proxy, n = e.ctx;
  yn = !1, t.beforeCreate && oi(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: a,
    beforeMount: h,
    mounted: p,
    beforeUpdate: m,
    updated: v,
    activated: T,
    deactivated: R,
    beforeDestroy: k,
    beforeUnmount: D,
    destroyed: N,
    unmounted: x,
    render: P,
    renderTracked: Z,
    renderTriggered: B,
    errorCaptured: O,
    serverPrefetch: A,
    // public API
    expose: H,
    inheritAttrs: q,
    // assets
    components: M,
    directives: se,
    filters: ye
  } = t;
  if (f && Ml(f, n, null), o)
    for (const Q in o) {
      const ce = o[Q];
      G(ce) && (n[Q] = ce.bind(s));
    }
  if (i) {
    const Q = i.call(s, s);
    le(Q) && (e.data = /* @__PURE__ */ js(Q));
  }
  if (yn = !0, r)
    for (const Q in r) {
      const ce = r[Q], lt = G(ce) ? ce.bind(s, s) : G(ce.get) ? ce.get.bind(s, s) : Je, mt = !G(ce) && G(ce.set) ? ce.set.bind(s) : Je, Ke = He({
        get: lt,
        set: mt
      });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (ke) => Ke.value = ke
      });
    }
  if (l)
    for (const Q in l)
      Dr(l[Q], n, s, Q);
  if (c) {
    const Q = G(c) ? c.call(s) : c;
    Reflect.ownKeys(Q).forEach((ce) => {
      cl(ce, Q[ce]);
    });
  }
  a && oi(a, e, "c");
  function fe(Q, ce) {
    V(ce) ? ce.forEach((lt) => Q(lt.bind(s))) : ce && Q(ce.bind(s));
  }
  if (fe(bl, h), fe(jn, p), fe(Sl, m), fe(xl, v), fe(vl, T), fe(_l, R), fe(El, O), fe(Tl, Z), fe(wl, B), fe(Nr, D), fe(zn, x), fe(Cl, A), V(H))
    if (H.length) {
      const Q = e.exposed || (e.exposed = {});
      H.forEach((ce) => {
        Object.defineProperty(Q, ce, {
          get: () => s[ce],
          set: (lt) => s[ce] = lt,
          enumerable: !0
        });
      });
    } else
      e.exposed || (e.exposed = {});
  P && e.render === Je && (e.render = P), q != null && (e.inheritAttrs = q), M && (e.components = M), se && (e.directives = se), A && Lr(e);
}
function Ml(e, t, s = Je) {
  V(e) && (e = bn(e));
  for (const n in e) {
    const i = e[n];
    let r;
    le(i) ? "default" in i ? r = Qt(
      i.from || n,
      i.default,
      !0
    ) : r = Qt(i.from || n) : r = Qt(i), /* @__PURE__ */ ve(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[n] = r;
  }
}
function oi(e, t, s) {
  Ve(
    V(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Dr(e, t, s, n) {
  let i = n.includes(".") ? Tr(s, n) : () => s[n];
  if (me(e)) {
    const r = t[e];
    G(r) && $t(i, r);
  } else if (G(e))
    $t(i, e.bind(s));
  else if (le(e))
    if (V(e))
      e.forEach((r) => Dr(r, t, s, n));
    else {
      const r = G(e.handler) ? e.handler.bind(s) : t[e.handler];
      G(r) && $t(i, r, e);
    }
}
function Bn(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !i.length && !s && !n ? c = t : (c = {}, i.length && i.forEach(
    (f) => As(c, f, o, !0)
  ), As(c, t, o)), le(t) && r.set(t, c), c;
}
function As(e, t, s, n = !1) {
  const { mixins: i, extends: r } = t;
  r && As(e, r, s, !0), i && i.forEach(
    (o) => As(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const l = $l[o] || s && s[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const $l = {
  data: li,
  props: ci,
  emits: ci,
  // objects
  methods: Jt,
  computed: Jt,
  // lifecycle
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  // assets
  components: Jt,
  directives: Jt,
  // watch
  watch: Ll,
  // provide / inject
  provide: li,
  inject: Fl
};
function li(e, t) {
  return t ? e ? function() {
    return _e(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Fl(e, t) {
  return Jt(bn(e), bn(t));
}
function bn(e) {
  if (V(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Jt(e, t) {
  return e ? _e(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ci(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : _e(
    /* @__PURE__ */ Object.create(null),
    ri(e),
    ri(t ?? {})
  ) : t;
}
function Ll(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = _e(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Ae(e[n], t[n]);
  return s;
}
function kr() {
  return {
    app: null,
    config: {
      isNativeTag: Hi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Pl = 0;
function Nl(e, t) {
  return function(n, i = null) {
    G(n) || (n = _e({}, n)), i != null && !le(i) && (i = null);
    const r = kr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = r.app = {
      _uid: Pl++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: pc,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...h) {
        return o.has(a) || (a && G(a.install) ? (o.add(a), a.install(f, ...h)) : G(a) && (o.add(a), a(f, ...h))), f;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), f;
      },
      component(a, h) {
        return h ? (r.components[a] = h, f) : r.components[a];
      },
      directive(a, h) {
        return h ? (r.directives[a] = h, f) : r.directives[a];
      },
      mount(a, h, p) {
        if (!c) {
          const m = f._ceVNode || $e(n, i);
          return m.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), h && t ? t(m, a) : e(m, a, p), c = !0, f._container = a, a.__vue_app__ = f, Kn(m.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Ve(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, h) {
        return r.provides[a] = h, f;
      },
      runWithContext(a) {
        const h = Ft;
        Ft = f;
        try {
          return a();
        } finally {
          Ft = h;
        }
      }
    };
    return f;
  };
}
let Ft = null;
const Rl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${qe(t)}Modifiers`] || e[`${Lt(t)}Modifiers`];
function Dl(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || de;
  let i = s;
  const r = t.startsWith("update:"), o = r && Rl(n, t.slice(7));
  o && (o.trim && (i = s.map((a) => me(a) ? a.trim() : a)), o.number && (i = s.map(xo)));
  let l, c = n[l = qs(t)] || // also try camelCase event handler (#2249)
  n[l = qs(qe(t))];
  !c && r && (c = n[l = qs(Lt(t))]), c && Ve(
    c,
    e,
    6,
    i
  );
  const f = n[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ve(
      f,
      e,
      6,
      i
    );
  }
}
const kl = /* @__PURE__ */ new WeakMap();
function jr(e, t, s = !1) {
  const n = s ? kl : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, l = !1;
  if (!G(e)) {
    const c = (f) => {
      const a = jr(f, t, !0);
      a && (l = !0, _e(o, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (le(e) && n.set(e, null), null) : (V(r) ? r.forEach((c) => o[c] = null) : _e(o, r), le(e) && n.set(e, o), o);
}
function Vs(e, t) {
  return !e || !Ls(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, Lt(t)) || oe(e, t));
}
function sn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: c,
    render: f,
    renderCache: a,
    props: h,
    data: p,
    setupState: m,
    ctx: v,
    inheritAttrs: T
  } = e, R = Ts(e);
  let k, D;
  try {
    if (s.shapeFlag & 4) {
      const x = i || n, P = x;
      k = st(
        f.call(
          P,
          x,
          a,
          h,
          m,
          p,
          v
        )
      ), D = l;
    } else {
      const x = t;
      k = st(
        x.length > 1 ? x(
          h,
          { attrs: l, slots: o, emit: c }
        ) : x(
          h,
          null
        )
      ), D = t.props ? l : jl(l);
    }
  } catch (x) {
    ss.length = 0, Bs(x, e, 1), k = $e(Oe);
  }
  let N = k;
  if (D && T !== !1) {
    const x = Object.keys(D), { shapeFlag: P } = N;
    x.length && P & 7 && (r && x.some(Ps) && (D = zl(
      D,
      r
    )), N = xt(N, D, !1, !0));
  }
  return s.dirs && (N = xt(N, null, !1, !0), N.dirs = N.dirs ? N.dirs.concat(s.dirs) : s.dirs), s.transition && ls(N, s.transition), k = N, Ts(R), k;
}
const jl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ls(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, zl = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ps(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Bl(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: o, children: l, patchFlag: c } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? ai(n, o, f) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const p = a[h];
        if (zr(o, n, p) && !Vs(f, p))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? ai(n, o, f) : !0 : !!o;
  return !1;
}
function ai(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (zr(t, e, r) && !Vs(s, r))
      return !0;
  }
  return !1;
}
function zr(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && le(n) && le(i) ? !Mn(n, i) : n !== i;
}
function Hl({ vnode: e, parent: t, suspense: s }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  s && s.activeBranch === e && (s.vnode.el = n);
}
const Br = {}, Hr = () => Object.create(Br), Wr = (e) => Object.getPrototypeOf(e) === Br;
function Wl(e, t, s, n = !1) {
  const i = {}, r = Hr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Vr(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ Yo(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Vl(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ re(i), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let p = a[h];
        if (Vs(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (c)
          if (oe(r, p))
            m !== r[p] && (r[p] = m, f = !0);
          else {
            const v = qe(p);
            i[v] = Sn(
              c,
              l,
              v,
              m,
              e,
              !1
            );
          }
        else
          m !== r[p] && (r[p] = m, f = !0);
      }
    }
  } else {
    Vr(e, t, i, r) && (f = !0);
    let a;
    for (const h in l)
      (!t || // for camelCase
      !oe(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Lt(h)) === h || !oe(t, a))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[a] !== void 0) && (i[h] = Sn(
        c,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete i[h]);
    if (r !== l)
      for (const h in r)
        (!t || !oe(t, h)) && (delete r[h], f = !0);
  }
  f && ht(e.attrs, "set", "");
}
function Vr(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Yt(c))
        continue;
      const f = t[c];
      let a;
      i && oe(i, a = qe(c)) ? !r || !r.includes(a) ? s[a] = f : (l || (l = {}))[a] = f : Vs(e.emitsOptions, c) || (!(c in n) || f !== n[c]) && (n[c] = f, o = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ re(s), f = l || de;
    for (let a = 0; a < r.length; a++) {
      const h = r[a];
      s[h] = Sn(
        i,
        c,
        h,
        f[h],
        e,
        !oe(f, h)
      );
    }
  }
  return o;
}
function Sn(e, t, s, n, i, r) {
  const o = e[s];
  if (o != null) {
    const l = oe(o, "default");
    if (l && n === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && G(c)) {
        const { propsDefaults: f } = i;
        if (s in f)
          n = f[s];
        else {
          const a = ds(i);
          n = f[s] = c.call(
            null,
            t
          ), a();
        }
      } else
        n = c;
      i.ce && i.ce._setProp(s, n);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Lt(s)) && (n = !0));
  }
  return n;
}
const Kl = /* @__PURE__ */ new WeakMap();
function Kr(e, t, s = !1) {
  const n = s ? Kl : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, l = [];
  let c = !1;
  if (!G(e)) {
    const a = (h) => {
      c = !0;
      const [p, m] = Kr(h, t, !0);
      _e(o, p), m && l.push(...m);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!r && !c)
    return le(e) && n.set(e, kt), kt;
  if (V(r))
    for (let a = 0; a < r.length; a++) {
      const h = qe(r[a]);
      ui(h) && (o[h] = de);
    }
  else if (r)
    for (const a in r) {
      const h = qe(a);
      if (ui(h)) {
        const p = r[a], m = o[h] = V(p) || G(p) ? { type: p } : _e({}, p), v = m.type;
        let T = !1, R = !0;
        if (V(v))
          for (let k = 0; k < v.length; ++k) {
            const D = v[k], N = G(D) && D.name;
            if (N === "Boolean") {
              T = !0;
              break;
            } else
              N === "String" && (R = !1);
          }
        else
          T = G(v) && v.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = T, m[
          1
          /* shouldCastTrue */
        ] = R, (T || oe(m, "default")) && l.push(h);
      }
    }
  const f = [o, l];
  return le(e) && n.set(e, f), f;
}
function ui(e) {
  return e[0] !== "$" && !Yt(e);
}
const Hn = (e) => e === "_" || e === "_ctx" || e === "$stable", Wn = (e) => V(e) ? e.map(st) : [st(e)], Ul = (e, t, s) => {
  if (t._n)
    return t;
  const n = Cr((...i) => Wn(t(...i)), s);
  return n._c = !1, n;
}, Ur = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (Hn(i))
      continue;
    const r = e[i];
    if (G(r))
      t[i] = Ul(i, r, n);
    else if (r != null) {
      const o = Wn(r);
      t[i] = () => o;
    }
  }
}, Jr = (e, t) => {
  const s = Wn(t);
  e.slots.default = () => s;
}, qr = (e, t, s) => {
  for (const n in t)
    (s || !Hn(n)) && (e[n] = t[n]);
}, Jl = (e, t, s) => {
  const n = e.slots = Hr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (qr(n, t, s), s && qi(n, "_", i, !0)) : Ur(t, n);
  } else
    t && Jr(e, t);
}, ql = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, o = de;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? r = !1 : qr(i, t, s) : (r = !t.$stable, Ur(t, i)), o = t;
  } else
    t && (Jr(e, t), o = { default: 1 });
  if (r)
    for (const l in i)
      !Hn(l) && o[l] == null && delete i[l];
}, Fe = Zl;
function Yl(e) {
  return Gl(e);
}
function Gl(e, t) {
  const s = Ds();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: a,
    parentNode: h,
    nextSibling: p,
    setScopeId: m = Je,
    insertStaticContent: v
  } = e, T = (u, d, g, y = null, _ = null, b = null, I = void 0, C = null, E = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !It(u, d) && (y = K(u), ke(u, _, b, !0), u = null), d.patchFlag === -2 && (E = !1, d.dynamicChildren = null);
    const { type: S, ref: W, shapeFlag: F } = d;
    switch (S) {
      case Ks:
        R(u, d, g, y);
        break;
      case Oe:
        k(u, d, g, y);
        break;
      case rn:
        u == null && D(d, g, y, I);
        break;
      case Be:
        M(
          u,
          d,
          g,
          y,
          _,
          b,
          I,
          C,
          E
        );
        break;
      default:
        F & 1 ? P(
          u,
          d,
          g,
          y,
          _,
          b,
          I,
          C,
          E
        ) : F & 6 ? se(
          u,
          d,
          g,
          y,
          _,
          b,
          I,
          C,
          E
        ) : (F & 64 || F & 128) && S.process(
          u,
          d,
          g,
          y,
          _,
          b,
          I,
          C,
          E,
          ne
        );
    }
    W != null && _ ? Zt(W, u && u.ref, b, d || u, !d) : W == null && u && u.ref != null && Zt(u.ref, null, b, u, !0);
  }, R = (u, d, g, y) => {
    if (u == null)
      n(
        d.el = l(d.children),
        g,
        y
      );
    else {
      const _ = d.el = u.el;
      d.children !== u.children && f(_, d.children);
    }
  }, k = (u, d, g, y) => {
    u == null ? n(
      d.el = c(d.children || ""),
      g,
      y
    ) : d.el = u.el;
  }, D = (u, d, g, y) => {
    [u.el, u.anchor] = v(
      u.children,
      d,
      g,
      y,
      u.el,
      u.anchor
    );
  }, N = ({ el: u, anchor: d }, g, y) => {
    let _;
    for (; u && u !== d; )
      _ = p(u), n(u, g, y), u = _;
    n(d, g, y);
  }, x = ({ el: u, anchor: d }) => {
    let g;
    for (; u && u !== d; )
      g = p(u), i(u), u = g;
    i(d);
  }, P = (u, d, g, y, _, b, I, C, E) => {
    if (d.type === "svg" ? I = "svg" : d.type === "math" && (I = "mathml"), u == null)
      Z(
        d,
        g,
        y,
        _,
        b,
        I,
        C,
        E
      );
    else {
      const S = u.el && u.el._isVueCE ? u.el : null;
      try {
        S && S._beginPatch(), A(
          u,
          d,
          _,
          b,
          I,
          C,
          E
        );
      } finally {
        S && S._endPatch();
      }
    }
  }, Z = (u, d, g, y, _, b, I, C) => {
    let E, S;
    const { props: W, shapeFlag: F, transition: z, dirs: U } = u;
    if (E = u.el = o(
      u.type,
      b,
      W && W.is,
      W
    ), F & 8 ? a(E, u.children) : F & 16 && O(
      u.children,
      E,
      null,
      y,
      _,
      nn(u, b),
      I,
      C
    ), U && Ct(u, null, y, "created"), B(E, u, u.scopeId, I, y), W) {
      for (const ue in W)
        ue !== "value" && !Yt(ue) && r(E, ue, null, W[ue], b, y);
      "value" in W && r(E, "value", null, W.value, b), (S = W.onVnodeBeforeMount) && Qe(S, y, u);
    }
    U && Ct(u, null, y, "beforeMount");
    const ie = Xl(_, z);
    ie && z.beforeEnter(E), n(E, d, g), ((S = W && W.onVnodeMounted) || ie || U) && Fe(() => {
      try {
        S && Qe(S, y, u), ie && z.enter(E), U && Ct(u, null, y, "mounted");
      } finally {
      }
    }, _);
  }, B = (u, d, g, y, _) => {
    if (g && m(u, g), y)
      for (let b = 0; b < y.length; b++)
        m(u, y[b]);
    if (_) {
      let b = _.subTree;
      if (d === b || Qr(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const I = _.vnode;
        B(
          u,
          I,
          I.scopeId,
          I.slotScopeIds,
          _.parent
        );
      }
    }
  }, O = (u, d, g, y, _, b, I, C, E = 0) => {
    for (let S = E; S < u.length; S++) {
      const W = u[S] = C ? ft(u[S]) : st(u[S]);
      T(
        null,
        W,
        d,
        g,
        y,
        _,
        b,
        I,
        C
      );
    }
  }, A = (u, d, g, y, _, b, I) => {
    const C = d.el = u.el;
    let { patchFlag: E, dynamicChildren: S, dirs: W } = d;
    E |= u.patchFlag & 16;
    const F = u.props || de, z = d.props || de;
    let U;
    if (g && wt(g, !1), (U = z.onVnodeBeforeUpdate) && Qe(U, g, d, u), W && Ct(d, u, g, "beforeUpdate"), g && wt(g, !0), // HMR updated, force full diff
    // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    S && (!u.dynamicChildren || u.dynamicChildren.length !== S.length) && (E = 0, I = !1, S = null), (F.innerHTML && z.innerHTML == null || F.textContent && z.textContent == null) && a(C, ""), S ? H(
      u.dynamicChildren,
      S,
      C,
      g,
      y,
      nn(d, _),
      b
    ) : I || ce(
      u,
      d,
      C,
      null,
      g,
      y,
      nn(d, _),
      b,
      !1
    ), E > 0) {
      if (E & 16)
        q(C, F, z, g, _);
      else if (E & 2 && F.class !== z.class && r(C, "class", null, z.class, _), E & 4 && r(C, "style", F.style, z.style, _), E & 8) {
        const ie = d.dynamicProps;
        for (let ue = 0; ue < ie.length; ue++) {
          const ae = ie[ue], be = F[ae], xe = z[ae];
          (xe !== be || ae === "value") && r(C, ae, be, xe, _, g);
        }
      }
      E & 1 && u.children !== d.children && a(C, d.children);
    } else
      !I && S == null && q(C, F, z, g, _);
    ((U = z.onVnodeUpdated) || W) && Fe(() => {
      U && Qe(U, g, d, u), W && Ct(d, u, g, "updated");
    }, y);
  }, H = (u, d, g, y, _, b, I) => {
    for (let C = 0; C < d.length; C++) {
      const E = u[C], S = d[C], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === Be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !It(E, S) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? h(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      T(
        E,
        S,
        W,
        null,
        y,
        _,
        b,
        I,
        !0
      );
    }
  }, q = (u, d, g, y, _) => {
    if (d !== g) {
      if (d !== de)
        for (const b in d)
          !Yt(b) && !(b in g) && r(
            u,
            b,
            d[b],
            null,
            _,
            y
          );
      for (const b in g) {
        if (Yt(b))
          continue;
        const I = g[b], C = d[b];
        I !== C && b !== "value" && r(u, b, C, I, _, y);
      }
      "value" in g && r(u, "value", d.value, g.value, _);
    }
  }, M = (u, d, g, y, _, b, I, C, E) => {
    const S = d.el = u ? u.el : l(""), W = d.anchor = u ? u.anchor : l("");
    let { patchFlag: F, dynamicChildren: z, slotScopeIds: U } = d;
    U && (C = C ? C.concat(U) : U), u == null ? (n(S, g, y), n(W, g, y), O(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      g,
      W,
      _,
      b,
      I,
      C,
      E
    )) : F > 0 && F & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === z.length ? (H(
      u.dynamicChildren,
      z,
      g,
      _,
      b,
      I,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || _ && d === _.subTree) && Yr(
      u,
      d,
      !0
      /* shallow */
    )) : ce(
      u,
      d,
      g,
      W,
      _,
      b,
      I,
      C,
      E
    );
  }, se = (u, d, g, y, _, b, I, C, E) => {
    d.slotScopeIds = C, u == null ? d.shapeFlag & 512 ? _.ctx.activate(
      d,
      g,
      y,
      I,
      E
    ) : ye(
      d,
      g,
      y,
      _,
      b,
      I,
      E
    ) : Le(u, d, E);
  }, ye = (u, d, g, y, _, b, I) => {
    const C = u.component = lc(
      u,
      y,
      _
    );
    if (Hs(u) && (C.ctx.renderer = ne), cc(C, !1, I), C.asyncDep) {
      if (_ && _.registerDep(C, fe, I), !u.el) {
        const E = C.subTree = $e(Oe);
        k(null, E, d, g), u.placeholder = E.el;
      }
    } else
      fe(
        C,
        u,
        d,
        g,
        _,
        b,
        I
      );
  }, Le = (u, d, g) => {
    const y = d.component = u.component;
    if (Bl(u, d, g))
      if (y.asyncDep && !y.asyncResolved) {
        Q(y, d, g);
        return;
      } else
        y.next = d, y.update();
    else
      d.el = u.el, y.vnode = d;
  }, fe = (u, d, g, y, _, b, I) => {
    const C = () => {
      if (u.isMounted) {
        let { next: F, bu: z, u: U, parent: ie, vnode: ue } = u;
        {
          const Pe = Gr(u);
          if (Pe) {
            F && (F.el = ue.el, Q(u, F, I)), Pe.asyncDep.then(() => {
              Fe(() => {
                u.isUnmounted || S();
              }, _);
            });
            return;
          }
        }
        let ae = F, be;
        wt(u, !1), F ? (F.el = ue.el, Q(u, F, I)) : F = ue, z && Ys(z), (be = F.props && F.props.onVnodeBeforeUpdate) && Qe(be, ie, F, ue), wt(u, !0);
        const xe = sn(u), Ue = u.subTree;
        u.subTree = xe, T(
          Ue,
          xe,
          // parent may have changed if it's in a teleport
          h(Ue.el),
          // anchor may have changed if it's in a fragment
          K(Ue),
          u,
          _,
          b
        ), F.el = xe.el, ae === null && Hl(u, xe.el), U && Fe(U, _), (be = F.props && F.props.onVnodeUpdated) && Fe(
          () => Qe(be, ie, F, ue),
          _
        );
      } else {
        let F;
        const { el: z, props: U } = d, { bm: ie, m: ue, parent: ae, root: be, type: xe } = u, Ue = es(d);
        if (wt(u, !1), ie && Ys(ie), !Ue && (F = U && U.onVnodeBeforeMount) && Qe(F, ae, d), wt(u, !0), z && Te) {
          const Pe = () => {
            u.subTree = sn(u), Te(
              z,
              u.subTree,
              u,
              _,
              null
            );
          };
          Ue && xe.__asyncHydrate ? xe.__asyncHydrate(
            z,
            u,
            Pe
          ) : Pe();
        } else {
          be.ce && be.ce._hasShadowRoot() && be.ce._injectChildStyle(
            xe,
            u.parent ? u.parent.type : void 0
          );
          const Pe = u.subTree = sn(u);
          T(
            null,
            Pe,
            g,
            y,
            u,
            _,
            b
          ), d.el = Pe.el;
        }
        if (ue && Fe(ue, _), !Ue && (F = U && U.onVnodeMounted)) {
          const Pe = d;
          Fe(
            () => Qe(F, ae, Pe),
            _
          );
        }
        (d.shapeFlag & 256 || ae && es(ae.vnode) && ae.vnode.shapeFlag & 256) && u.a && Fe(u.a, _), u.isMounted = !0, d = g = y = null;
      }
    };
    u.scope.on();
    const E = u.effect = new sr(C);
    u.scope.off();
    const S = u.update = E.run.bind(E), W = u.job = E.runIfDirty.bind(E);
    W.i = u, W.id = u.uid, E.scheduler = () => kn(W), wt(u, !0), S();
  }, Q = (u, d, g) => {
    d.component = u;
    const y = u.vnode.props;
    u.vnode = d, u.next = null, Vl(u, d.props, y, g), ql(u, d.children, g), rt(), ti(u), ot();
  }, ce = (u, d, g, y, _, b, I, C, E = !1) => {
    const S = u && u.children, W = u ? u.shapeFlag : 0, F = d.children, { patchFlag: z, shapeFlag: U } = d;
    if (z > 0) {
      if (z & 128) {
        mt(
          S,
          F,
          g,
          y,
          _,
          b,
          I,
          C,
          E
        );
        return;
      } else if (z & 256) {
        lt(
          S,
          F,
          g,
          y,
          _,
          b,
          I,
          C,
          E
        );
        return;
      }
    }
    U & 8 ? (W & 16 && L(S, _, b), F !== S && a(g, F)) : W & 16 ? U & 16 ? mt(
      S,
      F,
      g,
      y,
      _,
      b,
      I,
      C,
      E
    ) : L(S, _, b, !0) : (W & 8 && a(g, ""), U & 16 && O(
      F,
      g,
      y,
      _,
      b,
      I,
      C,
      E
    ));
  }, lt = (u, d, g, y, _, b, I, C, E) => {
    u = u || kt, d = d || kt;
    const S = u.length, W = d.length, F = Math.min(S, W);
    let z;
    for (z = 0; z < F; z++) {
      const U = d[z] = E ? ft(d[z]) : st(d[z]);
      T(
        u[z],
        U,
        g,
        null,
        _,
        b,
        I,
        C,
        E
      );
    }
    S > W ? L(
      u,
      _,
      b,
      !0,
      !1,
      F
    ) : O(
      d,
      g,
      y,
      _,
      b,
      I,
      C,
      E,
      F
    );
  }, mt = (u, d, g, y, _, b, I, C, E) => {
    let S = 0;
    const W = d.length;
    let F = u.length - 1, z = W - 1;
    for (; S <= F && S <= z; ) {
      const U = u[S], ie = d[S] = E ? ft(d[S]) : st(d[S]);
      if (It(U, ie))
        T(
          U,
          ie,
          g,
          null,
          _,
          b,
          I,
          C,
          E
        );
      else
        break;
      S++;
    }
    for (; S <= F && S <= z; ) {
      const U = u[F], ie = d[z] = E ? ft(d[z]) : st(d[z]);
      if (It(U, ie))
        T(
          U,
          ie,
          g,
          null,
          _,
          b,
          I,
          C,
          E
        );
      else
        break;
      F--, z--;
    }
    if (S > F) {
      if (S <= z) {
        const U = z + 1, ie = U < W ? d[U].el : y;
        for (; S <= z; )
          T(
            null,
            d[S] = E ? ft(d[S]) : st(d[S]),
            g,
            ie,
            _,
            b,
            I,
            C,
            E
          ), S++;
      }
    } else if (S > z)
      for (; S <= F; )
        ke(u[S], _, b, !0), S++;
    else {
      const U = S, ie = S, ue = /* @__PURE__ */ new Map();
      for (S = ie; S <= z; S++) {
        const Ne = d[S] = E ? ft(d[S]) : st(d[S]);
        Ne.key != null && ue.set(Ne.key, S);
      }
      let ae, be = 0;
      const xe = z - ie + 1;
      let Ue = !1, Pe = 0;
      const Ht = new Array(xe);
      for (S = 0; S < xe; S++)
        Ht[S] = 0;
      for (S = U; S <= F; S++) {
        const Ne = u[S];
        if (be >= xe) {
          ke(Ne, _, b, !0);
          continue;
        }
        let Xe;
        if (Ne.key != null)
          Xe = ue.get(Ne.key);
        else
          for (ae = ie; ae <= z; ae++)
            if (Ht[ae - ie] === 0 && It(Ne, d[ae])) {
              Xe = ae;
              break;
            }
        Xe === void 0 ? ke(Ne, _, b, !0) : (Ht[Xe - ie] = S + 1, Xe >= Pe ? Pe = Xe : Ue = !0, T(
          Ne,
          d[Xe],
          g,
          null,
          _,
          b,
          I,
          C,
          E
        ), be++);
      }
      const Jn = Ue ? Ql(Ht) : kt;
      for (ae = Jn.length - 1, S = xe - 1; S >= 0; S--) {
        const Ne = ie + S, Xe = d[Ne], qn = d[Ne + 1], Yn = Ne + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          qn.el || Xr(qn)
        ) : y;
        Ht[S] === 0 ? T(
          null,
          Xe,
          g,
          Yn,
          _,
          b,
          I,
          C,
          E
        ) : Ue && (ae < 0 || S !== Jn[ae] ? Ke(Xe, g, Yn, 2) : ae--);
      }
    }
  }, Ke = (u, d, g, y, _ = null) => {
    const { el: b, type: I, transition: C, children: E, shapeFlag: S } = u;
    if (S & 6) {
      Ke(u.component.subTree, d, g, y);
      return;
    }
    if (S & 128) {
      u.suspense.move(d, g, y);
      return;
    }
    if (S & 64) {
      I.move(u, d, g, ne);
      return;
    }
    if (I === Be) {
      n(b, d, g);
      for (let F = 0; F < E.length; F++)
        Ke(E[F], d, g, y);
      n(u.anchor, d, g);
      return;
    }
    if (I === rn) {
      N(u, d, g);
      return;
    }
    if (y !== 2 && S & 1 && C)
      if (y === 0)
        C.persisted && !b[ze] ? n(b, d, g) : (C.beforeEnter(b), n(b, d, g), Fe(() => C.enter(b), _));
      else {
        const { leave: F, delayLeave: z, afterLeave: U } = C, ie = () => {
          u.ctx.isUnmounted ? i(b) : n(b, d, g);
        }, ue = () => {
          const ae = b._isLeaving || !!b[ze];
          b._isLeaving && b[ze](
            !0
            /* cancelled */
          ), C.persisted && !ae ? ie() : F(b, () => {
            ie(), U && U();
          });
        };
        z ? z(b, ie, ue) : ue();
      }
    else
      n(b, d, g);
  }, ke = (u, d, g, y = !1, _ = !1) => {
    const {
      type: b,
      props: I,
      ref: C,
      children: E,
      dynamicChildren: S,
      shapeFlag: W,
      patchFlag: F,
      dirs: z,
      cacheIndex: U,
      memo: ie
    } = u;
    if (F === -2 && (_ = !1), C != null && (rt(), Zt(C, null, g, u, !0), ot()), U != null && (d.renderCache[U] = void 0), W & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const ue = W & 1 && z, ae = !es(u);
    let be;
    if (ae && (be = I && I.onVnodeBeforeUnmount) && Qe(be, d, u), W & 6)
      w(u.component, g, y);
    else {
      if (W & 128) {
        u.suspense.unmount(g, y);
        return;
      }
      ue && Ct(u, null, d, "beforeUnmount"), W & 64 ? u.type.remove(
        u,
        d,
        g,
        ne,
        y
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Be || F > 0 && F & 64) ? L(
        S,
        d,
        g,
        !1,
        !0
      ) : (b === Be && F & 384 || !_ && W & 16) && L(E, d, g), y && ps(u);
    }
    const xe = ie != null && U == null;
    (ae && (be = I && I.onVnodeUnmounted) || ue || xe) && Fe(() => {
      be && Qe(be, d, u), ue && Ct(u, null, d, "unmounted"), xe && (u.el = null);
    }, g);
  }, ps = (u) => {
    const { type: d, el: g, anchor: y, transition: _ } = u;
    if (d === Be) {
      j(g, y);
      return;
    }
    if (d === rn) {
      x(u);
      return;
    }
    const b = () => {
      i(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (u.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: I, delayLeave: C } = _, E = () => I(g, b);
      C ? C(u.el, b, E) : E();
    } else
      b();
  }, j = (u, d) => {
    let g;
    for (; u !== d; )
      g = p(u), i(u), u = g;
    i(d);
  }, w = (u, d, g) => {
    const { bum: y, scope: _, job: b, subTree: I, um: C, m: E, a: S } = u;
    fi(E), fi(S), y && Ys(y), _.stop(), b && (b.flags |= 8, ke(I, u, d, g)), C && Fe(C, d), Fe(() => {
      u.isUnmounted = !0;
    }, d);
  }, L = (u, d, g, y = !1, _ = !1, b = 0) => {
    for (let I = b; I < u.length; I++)
      ke(u[I], d, g, y, _);
  }, K = (u) => {
    if (u.shapeFlag & 6)
      return K(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = p(u.anchor || u.el), g = d && d[dl];
    return g ? p(g) : d;
  };
  let Y = !1;
  const ee = (u, d, g) => {
    let y;
    u == null ? d._vnode && (ke(d._vnode, null, null, !0), y = d._vnode.component) : T(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      g
    ), d._vnode = u, Y || (Y = !0, ti(y), br(), Y = !1);
  }, ne = {
    p: T,
    um: ke,
    m: Ke,
    r: ps,
    mt: ye,
    mc: O,
    pc: ce,
    pbc: H,
    n: K,
    o: e
  };
  let X, Te;
  return t && ([X, Te] = t(
    ne
  )), {
    render: ee,
    hydrate: X,
    createApp: Nl(ee, X)
  };
}
function nn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function wt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Yr(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (V(n) && V(i))
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = ft(i[r]), l.el = o.el), !s && l.patchFlag !== -2 && Yr(o, l)), l.type === Ks && (l.patchFlag === -1 && (l = i[r] = ft(l)), l.el = o.el), l.type === Oe && !l.el && (l.el = o.el);
    }
}
function Ql(e) {
  const t = e.slice(), s = [0];
  let n, i, r, o, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const f = e[n];
    if (f !== 0) {
      if (i = s[s.length - 1], e[i] < f) {
        t[n] = i, s.push(n);
        continue;
      }
      for (r = 0, o = s.length - 1; r < o; )
        l = r + o >> 1, e[s[l]] < f ? r = l + 1 : o = l;
      f < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, o = s[r - 1]; r-- > 0; )
    s[r] = o, o = t[o];
  return s;
}
function Gr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Gr(t);
}
function fi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Xr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Xr(t.subTree) : null;
}
const Qr = (e) => e.__isSuspense;
function Zl(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : ll(e);
}
const Be = /* @__PURE__ */ Symbol.for("v-fgt"), Ks = /* @__PURE__ */ Symbol.for("v-txt"), Oe = /* @__PURE__ */ Symbol.for("v-cmt"), rn = /* @__PURE__ */ Symbol.for("v-stc"), ss = [];
let Re = null;
function pe(e = !1) {
  ss.push(Re = e ? null : []);
}
function ec() {
  ss.pop(), Re = ss[ss.length - 1] || null;
}
let cs = 1;
function Is(e, t = !1) {
  cs += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function Zr(e) {
  return e.dynamicChildren = cs > 0 ? Re || kt : null, ec(), cs > 0 && Re && Re.push(e), e;
}
function ge(e, t, s, n, i, r) {
  return Zr(
    J(
      e,
      t,
      s,
      n,
      i,
      r,
      !0
    )
  );
}
function tc(e, t, s, n, i) {
  return Zr(
    $e(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function Os(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function It(e, t) {
  return e.type === t.type && e.key === t.key;
}
const eo = ({ key: e }) => e ?? null, bs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? me(e) || /* @__PURE__ */ ve(e) || G(e) ? { i: it, r: e, k: t, f: !!s } : e : null);
function J(e, t = null, s = null, n = 0, i = null, r = e === Be ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && eo(t),
    ref: t && bs(t),
    scopeId: xr,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: it
  };
  return l ? (Ms(c, s), r & 128 && e.normalize(c)) : s && (c.shapeFlag |= me(s) ? 8 : 16), cs > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Re.push(c), c;
}
const $e = sc;
function sc(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === Al) && (e = Oe), Os(e)) {
    const l = xt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Ms(l, s), cs > 0 && !r && Re && (l.shapeFlag & 6 ? Re[Re.indexOf(e)] = l : Re.push(l)), l.patchFlag = -2, l;
  }
  if (hc(e) && (e = e.__vccOpts), t) {
    t = nc(t);
    let { class: l, style: c } = t;
    l && !me(l) && (t.class = Ot(l)), le(c) && (/* @__PURE__ */ zs(c) && !V(c) && (c = _e({}, c)), t.style = St(c));
  }
  const o = me(e) ? 1 : Qr(e) ? 128 : Er(e) ? 64 : le(e) ? 4 : G(e) ? 2 : 0;
  return J(
    e,
    t,
    s,
    n,
    i,
    o,
    r,
    !0
  );
}
function nc(e) {
  return e ? /* @__PURE__ */ zs(e) || Wr(e) ? _e({}, e) : e : null;
}
function xt(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: c } = e, f = t ? ic(i || {}, t) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && eo(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? V(r) ? r.concat(bs(t)) : [r, bs(t)] : bs(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Be ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && xt(e.ssContent),
    ssFallback: e.ssFallback && xt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && ls(
    a,
    c.clone(a)
  ), a;
}
function to(e = " ", t = 0) {
  return $e(Ks, null, e, t);
}
function tt(e = "", t = !1) {
  return t ? (pe(), tc(Oe, null, e)) : $e(Oe, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean" ? $e(Oe) : V(e) ? $e(
    Be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Os(e) ? ft(e) : $e(Ks, null, String(e));
}
function ft(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : xt(e);
}
function Ms(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (V(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Ms(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Wr(t) ? t._ctx = it : i === 3 && it && (it.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (n & 65) {
      Ms(e, { default: t });
      return;
    }
    t = { default: t, _ctx: it }, s = 32;
  } else
    t = String(t), n & 64 ? (s = 16, t = [to(t)]) : s = 8;
  e.children = t, e.shapeFlag |= s;
}
function ic(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Ot([t.class, n.class]));
      else if (i === "style")
        t.style = St([t.style, n.style]);
      else if (Ls(i)) {
        const r = t[i], o = n[i];
        o && r !== o && !(V(r) && r.includes(o)) ? t[i] = r ? [].concat(r, o) : o : o == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Ps(i) && (t[i] = o);
      } else
        i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Qe(e, t, s, n = null) {
  Ve(e, t, 7, [
    s,
    n
  ]);
}
const rc = kr();
let oc = 0;
function lc(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || rc, r = {
    uid: oc++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Qi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Kr(n, i),
    emitsOptions: jr(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: de,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: de,
    data: de,
    props: de,
    attrs: de,
    slots: de,
    refs: de,
    setupState: de,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Dl.bind(null, r), e.ce && e.ce(r), r;
}
let Me = null;
const Vn = () => Me || it;
let $s, xn;
{
  const e = Ds(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  $s = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Me = s
  ), xn = t(
    "__VUE_SSR_SETTERS__",
    (s) => as = s
  );
}
const ds = (e) => {
  const t = Me;
  return $s(e), e.scope.on(), () => {
    e.scope.off(), $s(t);
  };
}, hi = () => {
  Me && Me.scope.off(), $s(null);
};
function so(e) {
  return e.vnode.shapeFlag & 4;
}
let as = !1;
function cc(e, t = !1, s = !1) {
  t && xn(t);
  const { props: n, children: i } = e.vnode, r = so(e);
  Wl(e, n, r, t), Jl(e, i, s || t);
  const o = r ? ac(e, t) : void 0;
  return t && xn(!1), o;
}
function ac(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Il);
  const { setup: n } = s;
  if (n) {
    rt();
    const i = e.setupContext = n.length > 1 ? fc(e) : null, r = ds(e), o = hs(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = Vi(o);
    if (ot(), r(), (l || e.sp) && !es(e) && Lr(e), l) {
      if (o.then(hi, hi), t)
        return o.then((c) => {
          di(e, c, t);
        }).catch((c) => {
          Bs(c, e, 0);
        });
      e.asyncDep = o;
    } else
      di(e, o, t);
  } else
    no(e, t);
}
function di(e, t, s) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) && (e.setupState = vr(t)), no(e, s);
}
let pi;
function no(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && pi && !n.render) {
      const i = n.template || Bn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: c } = n, f = _e(
          _e(
            {
              isCustomElement: r,
              delimiters: l
            },
            o
          ),
          c
        );
        n.render = pi(i, f);
      }
    }
    e.render = n.render || Je;
  }
  {
    const i = ds(e);
    rt();
    try {
      Ol(e);
    } finally {
      ot(), i();
    }
  }
}
const uc = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function fc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, uc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Kn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(vr(Dn(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in ts)
        return ts[s](e);
    },
    has(t, s) {
      return s in t || s in ts;
    }
  })) : e.proxy;
}
function hc(e) {
  return G(e) && "__vccOpts" in e;
}
const He = (e, t) => /* @__PURE__ */ sl(e, t, as);
function dc(e, t, s) {
  try {
    Is(-1);
    const n = arguments.length;
    return n === 2 ? le(t) && !V(t) ? Os(t) ? $e(e, null, [t]) : $e(e, t) : $e(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Os(s) && (s = [s]), $e(e, t, s));
  } finally {
    Is(1);
  }
}
const pc = "3.5.39";
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Cn;
const gi = typeof window < "u" && window.trustedTypes;
if (gi)
  try {
    Cn = /* @__PURE__ */ gi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const io = Cn ? (e) => Cn.createHTML(e) : (e) => e, gc = "http://www.w3.org/2000/svg", mc = "http://www.w3.org/1998/Math/MathML", ut = typeof document < "u" ? document : null, mi = ut && /* @__PURE__ */ ut.createElement("template"), vc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? ut.createElementNS(gc, e) : t === "mathml" ? ut.createElementNS(mc, e) : s ? ut.createElement(e, { is: s }) : ut.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => ut.createTextNode(e),
  createComment: (e) => ut.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ut.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, r) {
    const o = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      mi.innerHTML = io(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = mi.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, vt = "transition", Kt = "animation", us = /* @__PURE__ */ Symbol("_vtc"), ro = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, _c = /* @__PURE__ */ _e(
  {},
  Ar,
  ro
), yc = (e) => (e.displayName = "Transition", e.props = _c, e), bc = /* @__PURE__ */ yc(
  (e, { slots: t }) => dc(ml, Sc(e), t)
), Tt = (e, t = []) => {
  V(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, vi = (e) => e ? V(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Sc(e) {
  const t = {};
  for (const M in e)
    M in ro || (t[M] = e[M]);
  if (e.css === !1)
    return t;
  const {
    name: s = "v",
    type: n,
    duration: i,
    enterFromClass: r = `${s}-enter-from`,
    enterActiveClass: o = `${s}-enter-active`,
    enterToClass: l = `${s}-enter-to`,
    appearFromClass: c = r,
    appearActiveClass: f = o,
    appearToClass: a = l,
    leaveFromClass: h = `${s}-leave-from`,
    leaveActiveClass: p = `${s}-leave-active`,
    leaveToClass: m = `${s}-leave-to`
  } = e, v = xc(i), T = v && v[0], R = v && v[1], {
    onBeforeEnter: k,
    onEnter: D,
    onEnterCancelled: N,
    onLeave: x,
    onLeaveCancelled: P,
    onBeforeAppear: Z = k,
    onAppear: B = D,
    onAppearCancelled: O = N
  } = t, A = (M, se, ye, Le) => {
    M._enterCancelled = Le, Et(M, se ? a : l), Et(M, se ? f : o), ye && ye();
  }, H = (M, se) => {
    M._isLeaving = !1, Et(M, h), Et(M, m), Et(M, p), se && se();
  }, q = (M) => (se, ye) => {
    const Le = M ? B : D, fe = () => A(se, M, ye);
    Tt(Le, [se, fe]), _i(() => {
      Et(se, M ? c : r), at(se, M ? a : l), vi(Le) || yi(se, n, T, fe);
    });
  };
  return _e(t, {
    onBeforeEnter(M) {
      Tt(k, [M]), at(M, r), at(M, o);
    },
    onBeforeAppear(M) {
      Tt(Z, [M]), at(M, c), at(M, f);
    },
    onEnter: q(!1),
    onAppear: q(!0),
    onLeave(M, se) {
      M._isLeaving = !0;
      const ye = () => H(M, se);
      at(M, h), M._enterCancelled ? (at(M, p), xi(M)) : (xi(M), at(M, p)), _i(() => {
        M._isLeaving && (Et(M, h), at(M, m), vi(x) || yi(M, n, R, ye));
      }), Tt(x, [M, ye]);
    },
    onEnterCancelled(M) {
      A(M, !1, void 0, !0), Tt(N, [M]);
    },
    onAppearCancelled(M) {
      A(M, !0, void 0, !0), Tt(O, [M]);
    },
    onLeaveCancelled(M) {
      H(M), Tt(P, [M]);
    }
  });
}
function xc(e) {
  if (e == null)
    return null;
  if (le(e))
    return [on(e.enter), on(e.leave)];
  {
    const t = on(e);
    return [t, t];
  }
}
function on(e) {
  return Co(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[us] || (e[us] = /* @__PURE__ */ new Set())).add(t);
}
function Et(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const s = e[us];
  s && (s.delete(t), s.size || (e[us] = void 0));
}
function _i(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Cc = 0;
function yi(e, t, s, n) {
  const i = e._endId = ++Cc, r = () => {
    i === e._endId && n();
  };
  if (s != null)
    return setTimeout(r, s);
  const { type: o, timeout: l, propCount: c } = wc(e, t);
  if (!o)
    return n();
  const f = o + "end";
  let a = 0;
  const h = () => {
    e.removeEventListener(f, p), r();
  }, p = (m) => {
    m.target === e && ++a >= c && h();
  };
  setTimeout(() => {
    a < c && h();
  }, l + 1), e.addEventListener(f, p);
}
function wc(e, t) {
  const s = window.getComputedStyle(e), n = (v) => (s[v] || "").split(", "), i = n(`${vt}Delay`), r = n(`${vt}Duration`), o = bi(i, r), l = n(`${Kt}Delay`), c = n(`${Kt}Duration`), f = bi(l, c);
  let a = null, h = 0, p = 0;
  t === vt ? o > 0 && (a = vt, h = o, p = r.length) : t === Kt ? f > 0 && (a = Kt, h = f, p = c.length) : (h = Math.max(o, f), a = h > 0 ? o > f ? vt : Kt : null, p = a ? a === vt ? r.length : c.length : 0);
  const m = a === vt && /\b(?:transform|all)(?:,|$)/.test(
    n(`${vt}Property`).toString()
  );
  return {
    type: a,
    timeout: h,
    propCount: p,
    hasTransform: m
  };
}
function bi(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((s, n) => Si(s) + Si(e[n])));
}
function Si(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function xi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Tc(e, t, s) {
  const n = e[us];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Ci = /* @__PURE__ */ Symbol("_vod"), Ec = /* @__PURE__ */ Symbol("_vsh"), Ac = /* @__PURE__ */ Symbol(""), Ic = /(?:^|;)\s*display\s*:/;
function Oc(e, t, s) {
  const n = e.style, i = me(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (me(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          s[l] == null && qt(n, l, "");
        }
      else
        for (const o in t)
          s[o] == null && qt(n, o, "");
    for (const o in s) {
      o === "display" && (r = !0);
      const l = s[o];
      l != null ? $c(
        e,
        o,
        !me(t) && t ? t[o] : void 0,
        l
      ) || qt(n, o, l) : qt(n, o, "");
    }
  } else if (i) {
    if (t !== s) {
      const o = n[Ac];
      o && (s += ";" + o), n.cssText = s, r = Ic.test(s);
    }
  } else
    t && e.removeAttribute("style");
  Ci in e && (e[Ci] = r ? n.display : "", e[Ec] && (n.display = "none"));
}
const wi = /\s*!important$/;
function qt(e, t, s) {
  if (V(s))
    s.forEach((n) => qt(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Mc(e, t);
    wi.test(s) ? e.setProperty(
      Lt(n),
      s.replace(wi, ""),
      "important"
    ) : e[n] = s;
  }
}
const Ti = ["Webkit", "Moz", "ms"], ln = {};
function Mc(e, t) {
  const s = ln[t];
  if (s)
    return s;
  let n = qe(t);
  if (n !== "filter" && n in e)
    return ln[t] = n;
  n = Ji(n);
  for (let i = 0; i < Ti.length; i++) {
    const r = Ti[i] + n;
    if (r in e)
      return ln[t] = r;
  }
  return t;
}
function $c(e, t, s, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && me(n) && s === n;
}
const Ei = "http://www.w3.org/1999/xlink";
function Ai(e, t, s, n, i, r = Oo(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Ei, t.slice(6, t.length)) : e.setAttributeNS(Ei, t, s) : s == null || r && !Yi(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : We(s) ? String(s) : s
  );
}
function Ii(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? io(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = Yi(s) : s == null && l === "string" ? (s = "", o = !0) : l === "number" && (s = 0, o = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function Fc(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Lc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Oi = /* @__PURE__ */ Symbol("_vei");
function Pc(e, t, s, n, i = null) {
  const r = e[Oi] || (e[Oi] = {}), o = r[t];
  if (n && o)
    o.value = n;
  else {
    const [l, c] = Dc(t);
    if (n) {
      const f = r[t] = zc(
        n,
        i
      );
      Fc(e, l, f, c);
    } else
      o && (Lc(e, l, o, c), r[t] = void 0);
  }
}
const Nc = /(Once|Passive|Capture)$/, Rc = /^on:?(?:Once|Passive|Capture)$/;
function Dc(e) {
  let t, s;
  for (; (s = e.match(Nc)) && !Rc.test(e); )
    t || (t = {}), e = e.slice(0, e.length - s[1].length), t[s[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Lt(e.slice(2)), t];
}
let cn = 0;
const kc = /* @__PURE__ */ Promise.resolve(), jc = () => cn || (kc.then(() => cn = 0), cn = Date.now());
function zc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    const i = s.value;
    if (V(i)) {
      const r = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        r.call(n), n._stopped = !0;
      };
      const o = i.slice(), l = [n];
      for (let c = 0; c < o.length && !n._stopped; c++) {
        const f = o[c];
        f && Ve(
          f,
          t,
          5,
          l
        );
      }
    } else
      Ve(
        i,
        t,
        5,
        [n]
      );
  };
  return s.value = e, s.attached = jc(), s;
}
const Mi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Bc = (e, t, s, n, i, r) => {
  const o = i === "svg";
  t === "class" ? Tc(e, n, o) : t === "style" ? Oc(e, s, n) : Ls(t) ? Ps(t) || Pc(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Hc(e, t, n, o)) ? (Ii(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ai(e, t, n, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Wc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !me(n))) ? Ii(e, qe(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ai(e, t, n, o));
};
function Hc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mi(t) && G(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Mi(t) && me(s) ? !1 : t in e;
}
function Wc(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = qe(t);
  return Array.isArray(s) ? s.some((i) => qe(i) === n) : Object.keys(s).some((i) => qe(i) === n);
}
const Vc = ["ctrl", "shift", "alt", "meta"], Kc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Vc.some((s) => e[`${s}Key`] && !t.includes(s))
}, wn = (e, t) => {
  if (!e)
    return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = (i, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const l = Kc[t[o]];
      if (l && l(i, t))
        return;
    }
    return e(i, ...r);
  });
}, Uc = /* @__PURE__ */ _e({ patchProp: Bc }, vc);
let $i;
function Jc() {
  return $i || ($i = Yl(Uc));
}
const qc = (...e) => {
  const t = Jc().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Gc(n);
    if (!i)
      return;
    const r = t._component;
    !G(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = s(i, !1, Yc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
};
function Yc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Gc(e) {
  return me(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let oo;
const Us = (e) => oo = e, lo = (
  /* istanbul ignore next */
  Symbol()
);
function Tn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ns;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ns || (ns = {}));
function Xc() {
  const e = Zi(!0), t = e.run(() => /* @__PURE__ */ we({}));
  let s = [], n = [];
  const i = Dn({
    install(r) {
      Us(i), i._a = r, r.provide(lo, i), r.config.globalProperties.$pinia = i, n.forEach((o) => s.push(o)), n = [];
    },
    use(r) {
      return this._a ? s.push(r) : n.push(r), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const co = () => {
};
function Fi(e, t, s, n = co) {
  e.add(t);
  const i = () => {
    e.delete(t) && n();
  };
  return !s && er() && tr(i), i;
}
function Nt(e, ...t) {
  e.forEach((s) => {
    s(...t);
  });
}
const Qc = (e) => e(), Li = Symbol(), an = Symbol();
function En(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], i = e[s];
    Tn(i) && Tn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ ve(n) && !/* @__PURE__ */ dt(n) ? e[s] = En(i, n) : e[s] = n;
  }
  return e;
}
const Zc = (
  /* istanbul ignore next */
  Symbol()
);
function ea(e) {
  return !Tn(e) || !Object.prototype.hasOwnProperty.call(e, Zc);
}
const { assign: _t } = Object;
function ta(e) {
  return !!(/* @__PURE__ */ ve(e) && e.effect);
}
function sa(e, t, s, n) {
  const { state: i, actions: r, getters: o } = t, l = s.state.value[e];
  let c;
  function f() {
    l || (s.state.value[e] = i ? i() : {});
    const a = /* @__PURE__ */ Qo(s.state.value[e]);
    return _t(a, r, Object.keys(o || {}).reduce((h, p) => (h[p] = Dn(He(() => {
      Us(s);
      const m = s._s.get(e);
      return o[p].call(m, m);
    })), h), {}));
  }
  return c = ao(e, f, t, s, n, !0), c;
}
function ao(e, t, s = {}, n, i, r) {
  let o;
  const l = _t({ actions: {} }, s), c = { deep: !0 };
  let f, a, h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m;
  const v = n.state.value[e];
  !r && !v && (n.state.value[e] = {});
  let T;
  function R(O) {
    let A;
    f = a = !1, typeof O == "function" ? (O(n.state.value[e]), A = {
      type: ns.patchFunction,
      storeId: e,
      events: m
    }) : (En(n.state.value[e], O), A = {
      type: ns.patchObject,
      payload: O,
      storeId: e,
      events: m
    });
    const H = T = Symbol();
    ws().then(() => {
      T === H && (f = !0);
    }), a = !0, Nt(h, A, n.state.value[e]);
  }
  const k = r ? function() {
    const { state: A } = s, H = A ? A() : {};
    this.$patch((q) => {
      _t(q, H);
    });
  } : (
    /* istanbul ignore next */
    co
  );
  function D() {
    o.stop(), h.clear(), p.clear(), n._s.delete(e);
  }
  const N = (O, A = "") => {
    if (Li in O)
      return O[an] = A, O;
    const H = function() {
      Us(n);
      const q = Array.from(arguments), M = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Set();
      function ye(Q) {
        M.add(Q);
      }
      function Le(Q) {
        se.add(Q);
      }
      Nt(p, {
        args: q,
        name: H[an],
        store: P,
        after: ye,
        onError: Le
      });
      let fe;
      try {
        fe = O.apply(this && this.$id === e ? this : P, q);
      } catch (Q) {
        throw Nt(se, Q), Q;
      }
      return fe instanceof Promise ? fe.then((Q) => (Nt(M, Q), Q)).catch((Q) => (Nt(se, Q), Promise.reject(Q))) : (Nt(M, fe), fe);
    };
    return H[Li] = !0, H[an] = A, H;
  }, x = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: Fi.bind(null, p),
    $patch: R,
    $reset: k,
    $subscribe(O, A = {}) {
      const H = Fi(h, O, A.detached, () => q()), q = o.run(() => $t(() => n.state.value[e], (M) => {
        (A.flush === "sync" ? a : f) && O({
          storeId: e,
          type: ns.direct,
          events: m
        }, M);
      }, _t({}, c, A)));
      return H;
    },
    $dispose: D
  }, P = /* @__PURE__ */ js(x);
  n._s.set(e, P);
  const B = (n._a && n._a.runWithContext || Qc)(() => n._e.run(() => (o = Zi()).run(() => t({ action: N }))));
  for (const O in B) {
    const A = B[O];
    if (/* @__PURE__ */ ve(A) && !ta(A) || /* @__PURE__ */ dt(A))
      r || (v && ea(A) && (/* @__PURE__ */ ve(A) ? A.value = v[O] : En(A, v[O])), n.state.value[e][O] = A);
    else if (typeof A == "function") {
      const H = N(A, O);
      B[O] = H, l.actions[O] = A;
    }
  }
  return _t(P, B), _t(/* @__PURE__ */ re(P), B), Object.defineProperty(P, "$state", {
    get: () => n.state.value[e],
    set: (O) => {
      R((A) => {
        _t(A, O);
      });
    }
  }), n._p.forEach((O) => {
    _t(P, o.run(() => O({
      store: P,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), v && r && s.hydrate && s.hydrate(P.$state, v), f = !0, a = !0, P;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function na(e, t, s) {
  let n;
  const i = typeof t == "function";
  n = i ? s : t;
  function r(o, l) {
    const c = al();
    return o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    o || (c ? Qt(lo, null) : null), o && Us(o), o = oo, o._s.has(e) || (i ? ao(e, t, n, o) : sa(e, n, o)), o._s.get(e);
  }
  return r.$id = e, r;
}
function ia(e, t) {
  if (e == null)
    return;
  let s = e;
  for (let n = 0; n < t.length; n++) {
    if (s === void 0 || s[t[n]] === void 0)
      return;
    if (s === null || s[t[n]] === null)
      return null;
    s = s[t[n]];
  }
  return s;
}
function Un(e, t, s) {
  if (s.length === 0)
    return t;
  const n = s[0];
  return s.length > 1 && (t = Un(typeof e != "object" || e === null || !Object.prototype.hasOwnProperty.call(e, n) ? Number.isInteger(Number(s[1])) ? [] : {} : e[n], t, Array.prototype.slice.call(s, 1))), Number.isInteger(Number(n)) && Array.isArray(e) ? e.slice()[n] : Object.assign({}, e, { [n]: t });
}
function uo(e, t) {
  if (e == null || t.length === 0)
    return e;
  if (t.length === 1) {
    if (e == null)
      return e;
    if (Number.isInteger(t[0]) && Array.isArray(e))
      return Array.prototype.slice.call(e, 0).splice(t[0], 1);
    const s = {};
    for (const n in e)
      s[n] = e[n];
    return delete s[t[0]], s;
  }
  if (e[t[0]] == null) {
    if (Number.isInteger(t[0]) && Array.isArray(e))
      return Array.prototype.concat.call([], e);
    const s = {};
    for (const n in e)
      s[n] = e[n];
    return s;
  }
  return Un(e, uo(e[t[0]], Array.prototype.slice.call(t, 1)), [t[0]]);
}
function fo(e, t) {
  return t.map((s) => s.split(".")).map((s) => [s, ia(e, s)]).filter((s) => s[1] !== void 0).reduce((s, n) => Un(s, n[1], n[0]), {});
}
function ho(e, t) {
  return t.map((s) => s.split(".")).reduce((s, n) => uo(s, n), e);
}
function Pi(e, { storage: t, serializer: s, key: n, debug: i, pick: r, omit: o, beforeHydrate: l, afterHydrate: c }, f, a = !0) {
  try {
    a && (l == null || l(f));
    const h = t.getItem(n);
    if (h) {
      const p = s.deserialize(h), m = r ? fo(p, r) : p, v = o ? ho(m, o) : m;
      e.$patch(v);
    }
    a && (c == null || c(f));
  } catch (h) {
    i && console.error("[pinia-plugin-persistedstate]", h);
  }
}
function Ni(e, { storage: t, serializer: s, key: n, debug: i, pick: r, omit: o }) {
  try {
    const l = r ? fo(e, r) : e, c = o ? ho(l, o) : l, f = s.serialize(c);
    t.setItem(n, f);
  } catch (l) {
    i && console.error("[pinia-plugin-persistedstate]", l);
  }
}
function ra(e, t) {
  return typeof e == "function" ? e(t) : typeof e == "string" ? e : t;
}
function oa(e, t, s) {
  const { pinia: n, store: i, options: { persist: r = s } } = e;
  if (!r)
    return;
  // v8 ignore if -- @preserve
  if (!(i.$id in n.state.value)) {
    const l = n._s.get(i.$id.replace("__hot:", ""));
    l && Promise.resolve().then(() => l.$persist());
    return;
  }
  const o = (Array.isArray(r) ? r : r === !0 ? [{}] : [r]).map(t);
  i.$hydrate = ({ runHooks: l = !0 } = {}) => {
    o.forEach((c) => {
      Pi(i, c, e, l);
    });
  }, i.$persist = () => {
    o.forEach((l) => {
      Ni(i.$state, l);
    });
  }, o.forEach((l) => {
    Pi(i, l, e), i.$subscribe((c, f) => Ni(f, l), { detached: !0 });
  });
}
function la(e = {}) {
  return function(t) {
    oa(t, (s) => {
      const n = ra(s.key, t.store.$id);
      return {
        key: (e.key ? e.key : (i) => i)(n),
        debug: s.debug ?? e.debug ?? !1,
        serializer: s.serializer ?? e.serializer ?? {
          serialize: (i) => JSON.stringify(i),
          deserialize: (i) => JSON.parse(i)
        },
        storage: s.storage ?? e.storage ?? window.localStorage,
        beforeHydrate: s.beforeHydrate ?? e.beforeHydrate,
        afterHydrate: s.afterHydrate ?? e.afterHydrate,
        pick: s.pick,
        omit: s.omit
      };
    }, e.auto ?? !1);
  };
}
var ca = la();
function _s(e) {
  if (!e)
    return 0;
  if (typeof e == "number")
    return e;
  const t = new Date(e).getTime();
  return isNaN(t) ? 0 : t;
}
async function aa(e) {
  const t = [];
  try {
    let s = [];
    try {
      s = (await new Function("url", "return import(url)")("/scripts/extensions.js")).getContext().characters || [];
    } catch {
      s = window.characters || [];
    }
    if (!s.length)
      return [];
    const n = 10;
    for (let i = 0; i < s.length; i += n) {
      const r = s.slice(i, i + n), o = [];
      await Promise.all(r.map(async (l) => {
        try {
          const c = await $.ajax({
            url: "/api/characters/chats",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ avatar_url: l.avatar })
          });
          (Array.isArray(c) ? c.map((a) => [a, a]) : Object.entries(c || {})).forEach(([a, h]) => {
            const p = typeof h == "string" ? h : h.file_name || a;
            if (!p)
              return;
            let m = 0;
            if (typeof h == "object" && (m = _s(h.last_mes) || _s(h.create_date) || _s(h.date) || 0), !m && typeof p == "string") {
              const v = p.match(/(\d{4}-\d{2}-\d{2})@(\d{2})h(\d{2})m/);
              v && (m = _s(`${v[1]}T${v[2]}:${v[3]}:00`));
            }
            o.push({
              id: p,
              title: typeof h == "object" && h.name ? h.name : p.replace(/\.jsonl?$/, ""),
              charName: l.name,
              avatarUrl: l.avatar,
              msgCount: h.mes_count ?? 0,
              lastActive: m || 1
            });
          });
        } catch {
        }
      })), t.push(...o), e && o.length > 0 && e(o);
    }
    return t;
  } catch {
    return [];
  }
}
async function An(e, t, s) {
  try {
    const n = await $.ajax({
      url: "/api/chats/get",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ ch_name: e, file_name: s.replace(/\.jsonl?$/, ""), avatar_url: t })
    }), i = Array.isArray(n) ? n : (n == null ? void 0 : n.chat) || (n == null ? void 0 : n.messages) || Object.values(n || {});
    return Array.isArray(i) ? i.filter((r) => (r == null ? void 0 : r.mes) !== void 0) : [];
  } catch {
    return [];
  }
}
async function ua(e, t, s) {
  try {
    const n = /* @__PURE__ */ new Date(), i = (f) => f.toString().padStart(2, "0"), r = Math.random().toString(36).substring(2, 8), o = `${n.getFullYear()}-${i(n.getMonth() + 1)}-${i(n.getDate())}@${i(n.getHours())}h${i(n.getMinutes())}m${i(n.getSeconds())}s_${n.getMilliseconds()}ms_${r}`, c = [{
      user_name: "You",
      character_name: s,
      create_date: Date.now(),
      chat_metadata: {}
    }, ...e];
    return await $.ajax({
      url: "/api/chats/save",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        ch_name: s,
        file_name: o,
        chat: c,
        avatar_url: t
      })
    }), !0;
  } catch (n) {
    return console.error("Save Data Failed:", (n == null ? void 0 : n.responseText) || n), !1;
  }
}
async function Ri(e, t, s) {
  try {
    const n = s.includes(".json") ? s : `${s}.jsonl`;
    return await $.ajax({
      url: "/api/chats/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        chatfile: n,
        avatar_url: t
      })
    }), !0;
  } catch (n) {
    return console.error("Delete Data Failed:", (n == null ? void 0 : n.responseText) || n), !1;
  }
}
let un = [];
const po = /* @__PURE__ */ na("chatLogManager", () => {
  const e = /* @__PURE__ */ we([]), t = /* @__PURE__ */ we(null), s = /* @__PURE__ */ we([]), n = /* @__PURE__ */ we(/* @__PURE__ */ new Set()), i = /* @__PURE__ */ we(""), r = /* @__PURE__ */ we([]), o = /* @__PURE__ */ we(!1), l = /* @__PURE__ */ we(!1), c = /* @__PURE__ */ we(!1), f = /* @__PURE__ */ we([]), a = He(() => {
    if (i.value.trim())
      return r.value.map((B) => ({
        type: "chat",
        id: B.id,
        charName: B.charName,
        chat: e.value.find((O) => O.id === B.chatId),
        searchHit: { content: B.content }
      }));
    const x = [], P = /* @__PURE__ */ new Map();
    e.value.forEach((B) => {
      const O = B.charName || "未知角色";
      P.has(O) || P.set(O, { avatarUrl: B.avatarUrl, chats: [], folderTime: 0 });
      const A = P.get(O);
      A.chats.push(B), B.lastActive > A.folderTime && (A.folderTime = B.lastActive);
    });
    const Z = Array.from(P.entries()).sort((B, O) => O[1].folderTime - B[1].folderTime);
    for (const [B, O] of Z)
      x.push({ type: "header", id: `header_${B}`, charName: B, avatarUrl: O.avatarUrl, chatCount: O.chats.length }), n.value.has(B) && [...O.chats].sort((H, q) => q.lastActive - H.lastActive).forEach((H) => {
        x.push({ type: "chat", id: `chat_${H.id}`, charName: B, chat: H });
      });
    return x;
  }), h = He(() => e.value.length === 0 ? !1 : i.value.trim() && r.value.length > 0 ? r.value.every((x) => f.value.includes(x.chatId)) : f.value.length === e.value.length);
  async function p() {
    if (!o.value) {
      o.value = !0;
      try {
        e.value = [], await aa((x) => {
          e.value.push(...x);
        }), m();
      } finally {
        o.value = !1;
      }
    }
  }
  async function m() {
    if (l.value)
      return;
    l.value = !0, un = [];
    const x = 5, P = e.value;
    for (let Z = 0; Z < P.length; Z += x) {
      const B = P.slice(Z, Z + x);
      await Promise.all(B.map(async (O) => {
        const A = await An(O.charName, O.avatarUrl, O.id);
        if (O.msgCount === 0 && A.length > 0 && (O.msgCount = A.length), A.length > 0) {
          const H = A[A.length - 1], q = H.send_date || H.date || H.time;
          if (q) {
            const M = typeof q == "number" ? q : new Date(q).getTime();
            !isNaN(M) && M > 0 && (O.lastActive = M);
          }
        }
        un.push(...A.map((H, q) => ({
          id: `${O.id}_${q}`,
          chatId: O.id,
          charName: O.charName,
          content: H.mes || ""
        })));
      })), await new Promise((O) => setTimeout(O, 10));
    }
    l.value = !1;
  }
  function v(x) {
    i.value = x;
    const P = x.trim().toLowerCase();
    r.value = P ? un.filter((Z) => Z.content.toLowerCase().includes(P)) : [];
  }
  async function T(x) {
    t.value = x.id, s.value = await An(x.charName, x.avatarUrl, x.id);
  }
  function R(x) {
    n.value.has(x) ? n.value.delete(x) : n.value.add(x);
  }
  function k() {
    c.value = !c.value, c.value || (f.value = []);
  }
  function D(x) {
    const P = f.value.indexOf(x);
    P > -1 ? f.value.splice(P, 1) : f.value.push(x);
  }
  function N() {
    if (h.value)
      f.value = [];
    else if (i.value.trim()) {
      const x = r.value.map((P) => P.chatId);
      f.value = Array.from(/* @__PURE__ */ new Set([...f.value, ...x]));
    } else
      f.value = e.value.map((x) => x.id);
  }
  return {
    allChats: e,
    displayRows: a,
    currentChatId: t,
    currentMessages: s,
    expandedChars: n,
    searchQuery: i,
    isIndexing: l,
    isBatchMode: c,
    selectedChatIds: f,
    isAllSelected: h,
    fetchChats: p,
    loadMessages: T,
    toggleChar: R,
    performSearch: v,
    toggleBatchMode: k,
    toggleSelection: D,
    toggleSelectAll: N
  };
});
function fa(e, t, s) {
  const n = new Array(e);
  return new Proxy(n, {
    get(i, r, o) {
      if (typeof r == "string") {
        const l = r.charCodeAt(0);
        if (l >= 48 && l <= 57) {
          const c = +r;
          if (Number.isInteger(c) && c >= 0 && c < e) {
            let f = i[c];
            if (!f) {
              const a = t[c * 2];
              f = i[c] = {
                index: c,
                key: s(c),
                start: a,
                size: t[c * 2 + 1],
                end: a + t[c * 2 + 1],
                lane: 0
              };
            }
            return f;
          }
        }
        if (r === "length")
          return e;
      }
      return Reflect.get(i, r, o);
    }
  });
}
function Rt(e, t, s) {
  let n = s.initialDeps ?? [], i, r = !0;
  function o() {
    const l = e();
    return (l.length !== n.length || l.some((f, a) => n[a] !== f)) && (n = l, i = t(...l), s != null && s.onChange && !(r && s.skipInitialOnChange) && s.onChange(i), r = !1), i;
  }
  return o.updateDeps = (l) => {
    n = l;
  }, o;
}
function Di(e, t) {
  if (e === void 0)
    throw new Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
  return e;
}
const ha = (e, t) => Math.abs(e - t) < 1.01, da = (e, t, s) => {
  let n;
  return function(...i) {
    e.clearTimeout(n), n = e.setTimeout(() => t.apply(this, i), s);
  };
};
let Ut;
const fn = () => {
  if (Ut !== void 0)
    return Ut;
  if (typeof navigator > "u")
    return Ut = !1;
  if (/iP(hone|od|ad)/.test(navigator.userAgent))
    return Ut = !0;
  const e = navigator.maxTouchPoints;
  return Ut = navigator.platform === "MacIntel" && e !== void 0 && e > 0;
}, ki = (e) => {
  const { offsetWidth: t, offsetHeight: s } = e;
  return { width: t, height: s };
}, pa = (e) => e, ga = (e) => {
  const t = Math.max(e.startIndex - e.overscan, 0), n = Math.min(e.endIndex + e.overscan, e.count - 1) - t + 1, i = new Array(n);
  for (let r = 0; r < n; r++)
    i[r] = t + r;
  return i;
}, ma = (e, t) => {
  const s = e.scrollElement;
  if (!s)
    return;
  const n = e.targetWindow;
  if (!n)
    return;
  const i = (o) => {
    const { width: l, height: c } = o;
    t({ width: Math.round(l), height: Math.round(c) });
  };
  if (i(ki(s)), !n.ResizeObserver)
    return () => {
    };
  const r = new n.ResizeObserver((o) => {
    const l = () => {
      const c = o[0];
      if (c != null && c.borderBoxSize) {
        const f = c.borderBoxSize[0];
        if (f) {
          i({ width: f.inlineSize, height: f.blockSize });
          return;
        }
      }
      i(ki(s));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(l) : l();
  });
  return r.observe(s, { box: "border-box" }), () => {
    r.unobserve(s);
  };
}, Fs = {
  passive: !0
}, va = typeof window > "u" ? !0 : "onscrollend" in window, _a = (e, t, s) => {
  const n = e.scrollElement;
  if (!n)
    return;
  const i = e.targetWindow;
  if (!i)
    return;
  const r = e.options.useScrollendEvent && va;
  let o = 0;
  const l = r ? null : da(
    i,
    () => t(o, !1),
    e.options.isScrollingResetDelay
  ), c = (h) => () => {
    o = s(n), l == null || l(), t(o, h);
  }, f = c(!0), a = c(!1);
  return n.addEventListener("scroll", f, Fs), r && n.addEventListener("scrollend", a, Fs), () => {
    n.removeEventListener("scroll", f), r && n.removeEventListener("scrollend", a);
  };
}, ya = (e, t) => _a(e, t, (s) => {
  const { horizontal: n, isRtl: i } = e.options;
  return n ? s.scrollLeft * (i && -1 || 1) : s.scrollTop;
}), ba = (e, t, s) => {
  if (s.options.useCachedMeasurements) {
    const n = s.indexFromElement(e), i = s.options.getItemKey(n);
    return s.itemSizeCache.get(i) ?? s.options.estimateSize(n);
  }
  if (t != null && t.borderBoxSize) {
    const n = t.borderBoxSize[0];
    if (n)
      return Math.round(
        n[s.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  if (!t) {
    const n = s.indexFromElement(e), i = s.options.getItemKey(n), r = s.itemSizeCache.get(i);
    if (r !== void 0)
      return r;
  }
  return e[s.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, Sa = (e, {
  adjustments: t = 0,
  behavior: s
}, n) => {
  var i, r;
  (r = (i = n.scrollElement) == null ? void 0 : i.scrollTo) == null || r.call(i, {
    [n.options.horizontal ? "left" : "top"]: e + t,
    behavior: s
  });
}, xa = Sa;
class Ca {
  constructor(t) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollState = null, this.measurementsCache = [], this._flatMeasurements = null, this.itemSizeCache = /* @__PURE__ */ new Map(), this.itemSizeCacheVersion = 0, this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMin = null, this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.pendingScrollAnchor = null, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this._iosDeferredAdjustment = 0, this._iosTouching = !1, this._iosJustTouchEnded = !1, this._iosTouchEndTimerId = null, this._intendedScrollOffset = null, this.elementsCache = /* @__PURE__ */ new Map(), this.now = () => {
      var s, n, i;
      return ((i = (n = (s = this.targetWindow) == null ? void 0 : s.performance) == null ? void 0 : n.now) == null ? void 0 : i.call(n)) ?? Date.now();
    }, this.observer = /* @__PURE__ */ (() => {
      let s = null;
      const n = () => s || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : s = new this.targetWindow.ResizeObserver((i) => {
        i.forEach((r) => {
          const o = () => {
            const l = r.target, c = this.indexFromElement(l);
            if (!l.isConnected) {
              this.observer.unobserve(l);
              for (const [f, a] of this.elementsCache)
                if (a === l) {
                  this.elementsCache.delete(f);
                  break;
                }
              return;
            }
            this.shouldMeasureDuringScroll(c) && this.resizeItem(
              c,
              this.options.measureElement(l, r, this)
            );
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(o) : o();
        });
      }));
      return {
        disconnect: () => {
          var i;
          (i = n()) == null || i.disconnect(), s = null;
        },
        observe: (i) => {
          var r;
          return (r = n()) == null ? void 0 : r.observe(i, { box: "border-box" });
        },
        unobserve: (i) => {
          var r;
          return (r = n()) == null ? void 0 : r.unobserve(i);
        }
      };
    })(), this.range = null, this.setOptions = (s) => {
      var n, i;
      const r = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: pa,
        rangeExtractor: ga,
        onChange: () => {
        },
        measureElement: ba,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        anchorTo: "start",
        followOnAppend: !1,
        scrollEndThreshold: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        laneAssignmentMode: "estimate",
        useCachedMeasurements: !1
      };
      for (const p in s) {
        const m = s[p];
        m !== void 0 && (r[p] = m);
      }
      const o = this.options;
      let l = null, c = null, f = !1;
      if (o !== void 0 && o.enabled && r.enabled && r.anchorTo === "end" && this.scrollElement !== null) {
        const p = o.count, m = r.count, v = this.getMeasurements(), T = p > 0 ? ((n = v[0]) == null ? void 0 : n.key) ?? o.getItemKey(0) : null, R = p > 0 ? ((i = v[p - 1]) == null ? void 0 : i.key) ?? o.getItemKey(p - 1) : null;
        if (m !== p || p > 0 && m > 0 && (r.getItemKey(0) !== T || r.getItemKey(m - 1) !== R)) {
          f = !0;
          const N = p > 0 ? this.getVirtualItemForOffset(this.getScrollOffset()) ?? v[0] : null;
          N && (l = [N.key, this.getScrollOffset() - N.start]);
          const x = r.followOnAppend === !0 ? "auto" : r.followOnAppend || null;
          x && m > p && this.isAtEnd(o.scrollEndThreshold) && (p === 0 || r.getItemKey(m - 1) !== R) && (c = x);
        }
      }
      this.options = r, f && (this.pendingMin = 0, this.itemSizeCacheVersion++);
      let a = !1, h = 0;
      if (l && this.scrollOffset !== null) {
        const [p, m] = l, v = this.getMeasurements(), { count: T, getItemKey: R } = this.options;
        let k = 0;
        for (; k < T && R(k) !== p; )
          k++;
        if (k < T) {
          const D = v[k];
          if (D) {
            const N = D.start + m;
            N !== this.scrollOffset && (h = N - this.scrollOffset, this.scrollOffset = N, a = !0);
          }
        }
      }
      (a || c) && (this.pendingScrollAnchor = [
        a ? l[0] : null,
        a ? l[1] : 0,
        c,
        h
      ]);
    }, this.notify = (s) => {
      var n, i;
      (i = (n = this.options).onChange) == null || i.call(n, this, s);
    }, this.maybeNotify = Rt(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (s) => {
        this.notify(s);
      },
      {
        key: !1,
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((s) => s()), this.unsubs = [], this.observer.disconnect(), this.rafId != null && this.targetWindow && (this.targetWindow.cancelAnimationFrame(this.rafId), this.rafId = null), this.scrollState = null, this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var s;
      const n = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== n) {
        if (this.cleanup(), !n) {
          this.maybeNotify();
          return;
        }
        if (this.scrollElement = n, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((s = this.scrollElement) == null ? void 0 : s.window) ?? null, this.elementsCache.forEach((r) => {
          this.observer.observe(r);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (r) => {
            this.scrollRect = r, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (r, o) => {
            if (o && this._intendedScrollOffset === null && r === this.scrollOffset)
              return;
            this._intendedScrollOffset !== null && Math.abs(r - this._intendedScrollOffset) < 1.5 && (r = this._intendedScrollOffset), this._intendedScrollOffset = null, this.scrollAdjustments = 0;
            const l = this.getScrollOffset();
            this.scrollDirection = o ? l === r ? this.scrollDirection : l < r ? "forward" : "backward" : null, this.scrollOffset = r, this.isScrolling = o, this._flushIosDeferredIfReady(), this.scrollState && this.scheduleScrollReconcile(), this.maybeNotify();
          })
        ), "addEventListener" in this.scrollElement) {
          const r = this.scrollElement, o = () => {
            this._iosTouching = !0, this._iosJustTouchEnded = !1, this._iosTouchEndTimerId !== null && this.targetWindow != null && (this.targetWindow.clearTimeout(this._iosTouchEndTimerId), this._iosTouchEndTimerId = null);
          }, l = () => {
            this._iosTouching = !1, !(!fn() || this.targetWindow == null) && (this._iosJustTouchEnded = !0, this._iosTouchEndTimerId = this.targetWindow.setTimeout(() => {
              this._iosJustTouchEnded = !1, this._iosTouchEndTimerId = null, this._flushIosDeferredIfReady();
            }, 150));
          };
          r.addEventListener(
            "touchstart",
            o,
            Fs
          ), r.addEventListener(
            "touchend",
            l,
            Fs
          ), this.unsubs.push(() => {
            r.removeEventListener("touchstart", o), r.removeEventListener("touchend", l), this._iosTouchEndTimerId !== null && this.targetWindow != null && (this.targetWindow.clearTimeout(this._iosTouchEndTimerId), this._iosTouchEndTimerId = null);
          });
        }
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
      const i = this.pendingScrollAnchor;
      if (this.pendingScrollAnchor = null, i && this.scrollElement && this.options.enabled) {
        const [r, o, l, c] = i;
        r !== null && !l && (fn() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded) ? c !== 0 && (this._iosDeferredAdjustment += c) : this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        })), l && this.scrollToEnd({ behavior: l });
      }
    }, this._flushIosDeferredIfReady = () => {
      if (this._iosDeferredAdjustment === 0 || this.isScrolling || this._iosTouching || this._iosJustTouchEnded)
        return;
      const s = this.getScrollOffset(), n = this.getMaxScrollOffset();
      if (s < 0 || s > n)
        return;
      const i = this._iosDeferredAdjustment;
      this._iosDeferredAdjustment = 0, this._scrollToOffset(s, {
        adjustments: this.scrollAdjustments += i,
        behavior: void 0
      });
    }, this.rafId = null, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (s, n) => {
      const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
      for (let o = n - 1; o >= 0; o--) {
        const l = s[o];
        if (i.has(l.lane))
          continue;
        const c = r.get(
          l.lane
        );
        if (c == null || l.end > c.end ? r.set(l.lane, l) : l.end < c.end && i.set(l.lane, !0), i.size === this.options.lanes)
          break;
      }
      return r.size === this.options.lanes ? Array.from(r.values()).sort((o, l) => o.end === l.end ? o.index - l.index : o.end - l.end)[0] : void 0;
    }, this.getMeasurementOptions = Rt(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes,
        this.options.laneAssignmentMode
      ],
      (s, n, i, r, o, l, c) => (this.prevLanes !== void 0 && this.prevLanes !== l && (this.lanesChangedFlag = !0), this.prevLanes = l, this.pendingMin = null, {
        count: s,
        paddingStart: n,
        scrollMargin: i,
        getItemKey: r,
        enabled: o,
        lanes: l,
        laneAssignmentMode: c
      }),
      {
        key: !1
      }
    ), this.getMeasurements = Rt(
      () => [this.getMeasurementOptions(), this.itemSizeCacheVersion],
      ({
        count: s,
        paddingStart: n,
        scrollMargin: i,
        getItemKey: r,
        enabled: o,
        lanes: l,
        laneAssignmentMode: c
      }, f) => {
        const a = this.itemSizeCache;
        if (!o)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > s)
          for (const v of this.laneAssignments.keys())
            v >= s && this.laneAssignments.delete(v);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMin = null), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((v) => {
          this.itemSizeCache.set(v.key, v.size);
        }));
        const h = this.lanesSettling ? 0 : this.pendingMin ?? 0;
        if (this.pendingMin = null, this.lanesSettling && this.measurementsCache.length === s && (this.lanesSettling = !1), l === 1) {
          const v = this.options.gap, T = s * 2;
          let R = this._flatMeasurements;
          if (!R || R.length < T) {
            const N = new Float64Array(T);
            R && h > 0 && N.set(R.subarray(0, h * 2)), R = N, this._flatMeasurements = R;
          }
          let k;
          if (h === 0)
            k = n + i;
          else {
            const N = h - 1;
            k = R[N * 2] + R[N * 2 + 1] + v;
          }
          for (let N = h; N < s; N++) {
            const x = r(N), P = a.get(x), Z = typeof P == "number" ? P : this.options.estimateSize(N);
            R[N * 2] = k, R[N * 2 + 1] = Z, k += Z + v;
          }
          const D = fa(s, R, r);
          return this.measurementsCache = D, D;
        }
        const p = this.measurementsCache.slice(0, h), m = new Array(l).fill(
          void 0
        );
        for (let v = 0; v < h; v++) {
          const T = p[v];
          T && (m[T.lane] = v);
        }
        for (let v = h; v < s; v++) {
          const T = r(v), R = this.laneAssignments.get(v);
          let k, D;
          const N = c === "estimate" || a.has(T);
          if (R !== void 0 && this.options.lanes > 1) {
            k = R;
            const B = m[k], O = B !== void 0 ? p[B] : void 0;
            D = O ? O.end + this.options.gap : n + i;
          } else {
            const B = this.options.lanes === 1 ? p[v - 1] : this.getFurthestMeasurement(p, v);
            D = B ? B.end + this.options.gap : n + i, k = B ? B.lane : v % this.options.lanes, this.options.lanes > 1 && N && this.laneAssignments.set(v, k);
          }
          const x = a.get(T), P = typeof x == "number" ? x : this.options.estimateSize(v), Z = D + P;
          p[v] = {
            index: v,
            start: D,
            size: P,
            end: Z,
            key: T,
            lane: k
          }, m[k] = v;
        }
        return this.measurementsCache = p, p;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.calculateRange = Rt(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (s, n, i, r) => s.length === 0 || n === 0 ? (this.range = null, null) : (this.range = Ta(
        s,
        n,
        i,
        r,
        // Pass the typed array so binary search + forward-walk can read
        // start/end directly from Float64Array, skipping the Proxy traps.
        r === 1 && this._flatMeasurements != null ? this._flatMeasurements : null
      ), this.range),
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = Rt(
      () => {
        let s = null, n = null;
        const i = this.calculateRange();
        return i && (s = i.startIndex, n = i.endIndex), this.maybeNotify.updateDeps([this.isScrolling, s, n]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          s,
          n
        ];
      },
      (s, n, i, r, o) => r === null || o === null ? [] : s({
        startIndex: r,
        endIndex: o,
        overscan: n,
        count: i
      }),
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (s) => {
      const n = this.options.indexAttribute, i = s.getAttribute(n);
      return i ? parseInt(i, 10) : (console.warn(
        `Missing attribute name '${n}={index}' on measured element.`
      ), -1);
    }, this.shouldMeasureDuringScroll = (s) => {
      var n;
      if (!this.scrollState || this.scrollState.behavior !== "smooth")
        return !0;
      const i = this.scrollState.index ?? ((n = this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)) == null ? void 0 : n.index);
      if (i !== void 0 && this.range) {
        const r = Math.max(
          this.options.overscan,
          Math.ceil((this.range.endIndex - this.range.startIndex) / 2)
        ), o = Math.max(0, i - r), l = Math.min(
          this.options.count - 1,
          i + r
        );
        return s >= o && s <= l;
      }
      return !0;
    }, this.measureElement = (s) => {
      if (!s) {
        this.elementsCache.forEach((o, l) => {
          o.isConnected || (this.observer.unobserve(o), this.elementsCache.delete(l));
        });
        return;
      }
      const n = this.indexFromElement(s), i = this.options.getItemKey(n), r = this.elementsCache.get(i);
      r !== s && (r && this.observer.unobserve(r), this.observer.observe(s), this.elementsCache.set(i, s)), (!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(n) && this.resizeItem(n, this.options.measureElement(s, void 0, this));
    }, this.resizeItem = (s, n) => {
      var i, r;
      if (s < 0 || s >= this.options.count)
        return;
      let o, l, c;
      const f = this._flatMeasurements;
      if (this.options.lanes === 1 && f !== null)
        c = this.options.getItemKey(s), l = f[s * 2], o = f[s * 2 + 1];
      else {
        const p = this.measurementsCache[s];
        if (!p)
          return;
        c = p.key, l = p.start, o = p.size;
      }
      const a = this.itemSizeCache.get(c) ?? o, h = n - a;
      if (h !== 0) {
        const p = this.options.anchorTo === "end" && ((i = this.scrollState) == null ? void 0 : i.behavior) !== "smooth" && this.getVirtualDistanceFromEnd() <= this.options.scrollEndThreshold, m = p ? this.getTotalSize() : 0, v = ((r = this.scrollState) == null ? void 0 : r.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(
          // The callback expects a VirtualItem; build one lazily only
          // when the consumer actually supplied a custom predicate.
          this.measurementsCache[s] ?? {
            index: s,
            key: c,
            start: l,
            size: o,
            end: l + o,
            lane: 0
          },
          h,
          this
        ) : (
          // Default: adjust when the resize is an above-viewport item.
          // First measurement (!has(key)): always adjust — the item
          // has never been sized, so the estimate→actual delta must
          // be compensated regardless of scroll direction.
          // Re-measurement (has(key)): skip during backward scroll
          // to avoid the "items jump while scrolling up" cascade.
          l < this.getScrollOffset() + this.scrollAdjustments && (!this.itemSizeCache.has(c) || this.scrollDirection !== "backward")
        ));
        (this.pendingMin === null || s < this.pendingMin) && (this.pendingMin = s), this.itemSizeCache.set(c, n), this.itemSizeCacheVersion++, p ? this.applyScrollAdjustment(this.getTotalSize() - m) : v && this.applyScrollAdjustment(h), this.notify(!1);
      }
    }, this.getVirtualItems = Rt(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (s, n) => {
        const i = [];
        for (let r = 0, o = s.length; r < o; r++) {
          const l = s[r], c = n[l];
          i.push(c);
        }
        return i;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (s) => {
      const n = this.getMeasurements();
      if (n.length === 0)
        return;
      const i = this._flatMeasurements, r = this.options.lanes === 1 && i != null, o = go(
        0,
        n.length - 1,
        r ? (l) => i[l * 2] : (l) => Di(n[l]).start,
        s
      );
      return Di(n[o]);
    }, this.getMaxScrollOffset = () => {
      if (!this.scrollElement)
        return 0;
      if ("scrollHeight" in this.scrollElement)
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      {
        const s = this.scrollElement.document.documentElement;
        return this.options.horizontal ? s.scrollWidth - this.scrollElement.innerWidth : s.scrollHeight - this.scrollElement.innerHeight;
      }
    }, this.getVirtualDistanceFromEnd = () => Math.max(
      this.getTotalSize() - this.getSize() - this.getScrollOffset(),
      0
    ), this.getDistanceFromEnd = () => Math.max(this.getMaxScrollOffset() - this.getScrollOffset(), 0), this.isAtEnd = (s = this.options.scrollEndThreshold) => this.getDistanceFromEnd() <= s, this.getOffsetForAlignment = (s, n, i = 0) => {
      if (!this.scrollElement)
        return 0;
      const r = this.getSize(), o = this.getScrollOffset();
      n === "auto" && (n = s >= o + r ? "end" : "start"), n === "center" ? s += (i - r) / 2 : n === "end" && (s -= r);
      const l = this.getMaxScrollOffset();
      return Math.max(Math.min(l, s), 0);
    }, this.getOffsetForIndex = (s, n = "auto") => {
      s = Math.max(0, Math.min(s, this.options.count - 1));
      const i = this.getSize(), r = this.getScrollOffset(), o = this.measurementsCache[s];
      if (!o)
        return;
      if (n === "auto")
        if (o.end >= r + i - this.options.scrollPaddingEnd)
          n = "end";
        else if (o.start <= r + this.options.scrollPaddingStart)
          n = "start";
        else
          return [r, n];
      if (n === "end" && s === this.options.count - 1)
        return [this.getMaxScrollOffset(), n];
      const l = n === "end" ? o.end + this.options.scrollPaddingEnd : o.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(l, n, o.size),
        n
      ];
    }, this.scrollToOffset = (s, { align: n = "start", behavior: i = "auto" } = {}) => {
      const r = this.getOffsetForAlignment(s, n), o = this.now();
      this.scrollState = {
        index: null,
        align: n,
        behavior: i,
        startedAt: o,
        lastTargetOffset: r,
        stableFrames: 0
      }, this._scrollToOffset(r, { adjustments: void 0, behavior: i }), this.scheduleScrollReconcile();
    }, this.scrollToIndex = (s, {
      align: n = "auto",
      behavior: i = "auto"
    } = {}) => {
      s = Math.max(0, Math.min(s, this.options.count - 1));
      const r = this.getOffsetForIndex(s, n);
      if (!r)
        return;
      const [o, l] = r, c = this.now();
      this.scrollState = {
        index: s,
        align: l,
        behavior: i,
        startedAt: c,
        lastTargetOffset: o,
        stableFrames: 0
      }, this._scrollToOffset(o, { adjustments: void 0, behavior: i }), this.scheduleScrollReconcile();
    }, this.scrollBy = (s, { behavior: n = "auto" } = {}) => {
      const i = this.getScrollOffset() + s, r = this.now();
      this.scrollState = {
        index: null,
        align: "start",
        behavior: n,
        startedAt: r,
        lastTargetOffset: i,
        stableFrames: 0
      }, this._scrollToOffset(i, { adjustments: void 0, behavior: n }), this.scheduleScrollReconcile();
    }, this.scrollToEnd = ({ behavior: s = "auto" } = {}) => {
      if (this.options.count > 0) {
        this.scrollToIndex(this.options.count - 1, {
          align: "end",
          behavior: s
        });
        return;
      }
      this.scrollToOffset(Math.max(this.getTotalSize() - this.getSize(), 0), {
        behavior: s
      });
    }, this.getTotalSize = () => {
      var s;
      const n = this.getMeasurements();
      let i;
      if (n.length === 0)
        i = this.options.paddingStart;
      else if (this.options.lanes === 1) {
        const r = n.length - 1, o = this._flatMeasurements;
        o != null ? i = o[r * 2] + o[r * 2 + 1] : i = ((s = n[r]) == null ? void 0 : s.end) ?? 0;
      } else {
        const r = Array(this.options.lanes).fill(null);
        let o = n.length - 1;
        for (; o >= 0 && r.some((l) => l === null); ) {
          const l = n[o];
          r[l.lane] === null && (r[l.lane] = l.end), o--;
        }
        i = Math.max(...r.filter((l) => l !== null));
      }
      return Math.max(
        i - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this.takeSnapshot = () => {
      const s = [];
      if (this.itemSizeCache.size === 0)
        return s;
      const n = this.getMeasurements();
      for (const i of n)
        i && this.itemSizeCache.has(i.key) && s.push({
          index: i.index,
          key: i.key,
          start: i.start,
          size: i.size,
          end: i.end,
          lane: i.lane
        });
      return s;
    }, this._scrollToOffset = (s, {
      adjustments: n,
      behavior: i
    }) => {
      this._intendedScrollOffset = s + (n ?? 0), this.options.scrollToFn(s, { behavior: i, adjustments: n }, this);
    }, this.measure = () => {
      this.pendingMin = null, this.itemSizeCache.clear(), this.laneAssignments.clear(), this.itemSizeCacheVersion++, this.notify(!1);
    }, this.setOptions(t);
  }
  applyScrollAdjustment(t, s) {
    t !== 0 && (fn() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded) ? this._iosDeferredAdjustment += t : (this._scrollToOffset(this.getScrollOffset(), {
      adjustments: this.scrollAdjustments += t,
      behavior: s
    }), this.scrollOffset !== null && (this.scrollOffset += this.scrollAdjustments, this.scrollAdjustments = 0)));
  }
  scheduleScrollReconcile() {
    if (!this.targetWindow) {
      this.scrollState = null;
      return;
    }
    this.rafId == null && (this.rafId = this.targetWindow.requestAnimationFrame(() => {
      this.rafId = null, this.reconcileScroll();
    }));
  }
  reconcileScroll() {
    if (!this.scrollState || !this.scrollElement)
      return;
    const s = 5e3;
    if (this.now() - this.scrollState.startedAt > s) {
      this.scrollState = null;
      return;
    }
    const n = this.scrollState.index != null ? this.getOffsetForIndex(this.scrollState.index, this.scrollState.align) : void 0, i = n ? n[0] : this.scrollState.lastTargetOffset, r = 1, o = i !== this.scrollState.lastTargetOffset;
    if (!o && ha(i, this.getScrollOffset())) {
      if (this.scrollState.stableFrames++, this.scrollState.stableFrames >= r) {
        this.getScrollOffset() !== i && this._scrollToOffset(i, {
          adjustments: void 0,
          behavior: "auto"
        }), this.scrollState = null;
        return;
      }
    } else if (this.scrollState.stableFrames = 0, o) {
      const l = this.getSize() || 600, c = Math.abs(i - this.getScrollOffset()), f = this.scrollState.behavior === "smooth" && c > l;
      this.scrollState.lastTargetOffset = i, f || (this.scrollState.behavior = "auto"), this._scrollToOffset(i, {
        adjustments: void 0,
        behavior: f ? "smooth" : "auto"
      });
    }
    this.scheduleScrollReconcile();
  }
}
const go = (e, t, s, n) => {
  for (; e <= t; ) {
    const i = (e + t) / 2 | 0, r = s(i);
    if (r < n)
      e = i + 1;
    else if (r > n)
      t = i - 1;
    else
      return i;
  }
  return e > 0 ? e - 1 : 0;
};
function wa(e, t, s) {
  let n = 0;
  for (; n <= t; ) {
    const i = (n + t) / 2 | 0, r = e[i * 2];
    if (r < s)
      n = i + 1;
    else if (r > s)
      t = i - 1;
    else
      return i;
  }
  return n > 0 ? n - 1 : 0;
}
function Ta(e, t, s, n, i) {
  const r = e.length - 1;
  if (e.length <= n)
    return { startIndex: 0, endIndex: r };
  if (n === 1 && i !== null) {
    const f = wa(
      i,
      r,
      s
    );
    let a = f;
    const h = s + t;
    for (; a < r && i[a * 2] + i[a * 2 + 1] < h; )
      a++;
    return { startIndex: f, endIndex: a };
  }
  let l = go(0, r, (f) => e[f].start, s), c = l;
  if (n === 1)
    for (; c < r && e[c].end < s + t; )
      c++;
  else if (n > 1) {
    const f = Array(n).fill(0);
    for (; c < r && f.some((h) => h < s + t); ) {
      const h = e[c];
      f[h.lane] = h.end, c++;
    }
    const a = Array(n).fill(s + t);
    for (; l >= 0 && a.some((h) => h >= s); ) {
      const h = e[l];
      a[h.lane] = h.start, l--;
    }
    l = Math.max(0, l - l % n), c = Math.min(r, c + (n - 1 - c % n));
  }
  return { startIndex: l, endIndex: c };
}
function Ea(e) {
  const t = new Ca(te(e)), s = /* @__PURE__ */ mn(t), n = t._didMount();
  return $t(
    () => te(e).getScrollElement(),
    (i) => {
      i && t._willUpdate();
    },
    {
      immediate: !0
    }
  ), $t(
    () => te(e),
    (i) => {
      t.setOptions({
        ...i,
        onChange: (r, o) => {
          var l;
          ei(s), (l = i.onChange) == null || l.call(i, r, o);
        }
      }), t._willUpdate(), ei(s);
    },
    {
      immediate: !0
    }
  ), tr(n), s;
}
function Aa(e) {
  return Ea(
    He(() => ({
      observeElementRect: ma,
      observeElementOffset: ya,
      scrollToFn: xa,
      ...te(e)
    }))
  );
}
const Ia = ["data-index"], Oa = ["onClick"], Ma = { class: "char-info" }, $a = { class: "folder-icon" }, Fa = { class: "char-name" }, La = { class: "chat-badge" }, Pa = ["onClick"], Na = ["checked", "onClick"], Ra = { class: "chat-item-content" }, Da = { class: "chat-title" }, ka = {
  key: 0,
  class: "search-tag"
}, ja = {
  key: 0,
  class: "hit-content"
}, za = {
  key: 1,
  class: "chat-meta"
}, Ba = {
  key: 0,
  class: "empty-state"
}, Ha = /* @__PURE__ */ Fr({
  __name: "SessionList",
  setup(e) {
    const t = po(), s = /* @__PURE__ */ we(null), n = He(() => t.displayRows), i = He(() => ({
      count: n.value.length,
      getScrollElement: () => s.value,
      estimateSize: () => 60,
      overscan: 10
    })), r = Aa(i), o = He(() => r.value.getVirtualItems()), l = () => r.value.getTotalSize(), c = (a) => n.value[a], f = (a) => {
      const h = c(a);
      h.type === "chat" && h.chat && (t.isBatchMode ? t.toggleSelection(h.chat.id) : t.loadMessages(h.chat));
    };
    return (a, h) => (pe(), ge("div", {
      ref_key: "containerRef",
      ref: s,
      class: "virtual-list-container"
    }, [
      J("div", {
        style: St({ height: l() + "px", position: "relative", width: "100%" })
      }, [
        (pe(!0), ge(Be, null, Rr(o.value, (p) => {
          var m, v, T, R, k, D;
          return pe(), ge("div", {
            key: p.index,
            class: "virtual-row",
            style: St({ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${p.start}px)` }),
            ref_for: !0,
            ref: te(r).measureElement,
            "data-index": p.index
          }, [
            c(p.index).type === "header" ? (pe(), ge("div", {
              key: 0,
              class: "char-header",
              onClick: (N) => te(t).toggleChar(c(p.index).charName)
            }, [
              J("div", Ma, [
                J("span", $a, Se(te(t).expandedChars.has(c(p.index).charName) ? "📂" : "📁"), 1),
                J("span", Fa, Se(c(p.index).charName), 1)
              ]),
              J("span", La, Se(c(p.index).chatCount), 1)
            ], 8, Oa)) : (pe(), ge("div", {
              key: 1,
              class: Ot(["chat-item", {
                active: !te(t).isBatchMode && te(t).currentChatId === ((m = c(p.index).chat) == null ? void 0 : m.id),
                selected: te(t).isBatchMode && te(t).selectedChatIds.includes(((v = c(p.index).chat) == null ? void 0 : v.id) || "")
              }]),
              onClick: (N) => f(p.index)
            }, [
              te(t).isBatchMode ? (pe(), ge("input", {
                key: 0,
                type: "checkbox",
                class: "batch-checkbox",
                checked: te(t).selectedChatIds.includes(((T = c(p.index).chat) == null ? void 0 : T.id) || ""),
                onClick: wn((N) => f(p.index), ["stop"])
              }, null, 8, Na)) : tt("", !0),
              J("div", Ra, [
                J("div", Da, [
                  te(t).searchQuery ? (pe(), ge("span", ka, "[" + Se(c(p.index).charName) + "]", 1)) : tt("", !0),
                  to(" " + Se(((R = c(p.index).chat) == null ? void 0 : R.title) || "未命名会话"), 1)
                ]),
                te(t).searchQuery ? (pe(), ge("div", ja, '"' + Se((k = c(p.index).searchHit) == null ? void 0 : k.content) + '"', 1)) : (pe(), ge("div", za, "消息数: " + Se(((D = c(p.index).chat) == null ? void 0 : D.msgCount) ?? "..."), 1))
              ])
            ], 10, Pa))
          ], 12, Ia);
        }), 128))
      ], 4),
      n.value.length === 0 ? (pe(), ge("div", Ba, "暂无匹配记录")) : tt("", !0)
    ], 512));
  }
});
const mo = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, Wa = /* @__PURE__ */ mo(Ha, [["__scopeId", "data-v-82b53ab7"]]);
function Js(e, t, s) {
  const n = new Blob([t], { type: s }), i = URL.createObjectURL(n), r = document.createElement("a");
  r.href = i, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(i);
}
function Va(e, t) {
  let s = `=== 聊天记录: ${e} ===
导出时间: ${(/* @__PURE__ */ new Date()).toLocaleString()}

`;
  t.forEach((n) => {
    const i = n.name || (n.is_user ? "You" : "Bot");
    s += `[${i}]:
${n.mes}

`;
  }), Js(`${e}.txt`, s, "text/plain;charset=utf-8");
}
function Ka(e, t) {
  let s = `# 聊天记录: ${e}
> 导出时间: ${(/* @__PURE__ */ new Date()).toLocaleString()}

---

`;
  t.forEach((n) => {
    const i = n.name || (n.is_user ? "You" : "Bot");
    s += `**${i}**:

${n.mes}

---

`;
  }), Js(`${e}.md`, s, "text/markdown;charset=utf-8");
}
function Ua(e, t, s) {
  const n = {
    user_name: "You",
    character_name: t,
    create_date: Date.now(),
    chat_metadata: {}
  }, i = [JSON.stringify(n), ...s.map((r) => JSON.stringify(r))];
  Js(`${e}.jsonl`, i.join(`
`), "application/octet-stream");
}
function Ja(e, t) {
  const n = `Batch_Export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${t}`;
  let i = "";
  t === "json" ? i = JSON.stringify(e, null, 2) : t === "md" ? (i = `# 批量导出聊天记录
> 导出时间: ${(/* @__PURE__ */ new Date()).toLocaleString()}
> 共包含 ${e.length} 个会话

`, e.forEach((r) => {
    i += `## 会话: ${r.title}

`, r.messages.forEach((o) => {
      const l = o.name || (o.is_user ? "You" : "Bot");
      i += `**${l}**:

${o.mes}

---

`;
    });
  })) : t === "txt" && (i = `=== 批量导出聊天记录 ===
导出时间: ${(/* @__PURE__ */ new Date()).toLocaleString()}
共包含 ${e.length} 个会话

`, e.forEach((r) => {
    i += `
>>> 会话: ${r.title} <<<

`, r.messages.forEach((o) => {
      const l = o.name || (o.is_user ? "You" : "Bot");
      i += `[${l}]:
${o.mes}

`;
    }), i += `=========================
`;
  })), Js(n, i, `text/${t === "json" ? "plain" : t};charset=utf-8`);
}
const qa = { class: "modal-header" }, Ya = { class: "header-actions" }, Ga = ["disabled"], Xa = ["title"], Qa = { class: "modal-body" }, Za = { class: "left-panel" }, eu = { class: "panel-header" }, tu = { class: "search-box" }, su = ["placeholder", "disabled"], nu = {
  key: 0,
  class: "search-loader"
}, iu = {
  key: 0,
  class: "select-all-bar"
}, ru = ["checked"], ou = {
  for: "selectAllBox",
  class: "select-all-label"
}, lu = { class: "right-panel" }, cu = { class: "panel-header right-header" }, au = {
  key: 0,
  class: "header-actions"
}, uu = {
  key: 0,
  class: "batch-panel"
}, fu = { class: "batch-status" }, hu = {
  key: 0,
  class: "hint"
}, du = {
  key: 0,
  class: "batch-actions"
}, pu = ["disabled"], gu = ["disabled"], mu = ["disabled"], vu = ["disabled"], _u = {
  key: 0,
  class: "empty-state"
}, yu = ["onClick"], bu = { class: "preview-text" }, ys = 72, ji = 12, Su = /* @__PURE__ */ Fr({
  __name: "LogOverview",
  setup(e) {
    const t = window.requestIdleCallback || ((j) => setTimeout(j, 1));
    class s {
      get win() {
        return window;
      }
      get context() {
        var w, L;
        try {
          if (typeof ((w = this.win.SillyTavern) == null ? void 0 : w.getContext) == "function")
            return this.win.SillyTavern.getContext();
          if (this.win.context)
            return this.win.context;
          if ((L = this.win.ST) != null && L.context)
            return this.win.ST.context;
        } catch {
        }
        return {};
      }
      getCurrentCharacterId() {
        return this.context.characterId ?? this.win.this_chid ?? -1;
      }
      getCurrentChatFileName() {
        return this.win.chat_file_name || "";
      }
      getCharacters() {
        return this.context.characters || this.win.characters || [];
      }
      selectCharacterById(w) {
        if (typeof this.context.selectCharacter == "function")
          return this.context.selectCharacter(w), !0;
        if (typeof this.win.selectCharacterById == "function")
          return this.win.selectCharacterById(w), !0;
        const L = document.querySelector(`.character_select[chid="${w}"], [data-character-id="${w}"], .character-item[data-id="${w}"]`);
        return L ? (L.click(), !0) : !1;
      }
      loadChat(w) {
        const K = w.replace(/\.jsonl?$/, "") + ".jsonl";
        return typeof this.context.loadChat == "function" ? (this.context.loadChat(K), !0) : typeof this.win.loadChat == "function" ? (this.win.loadChat(K), !0) : typeof this.win.getChat == "function" ? (this.win.chat_file_name = K, this.win.getChat(), !0) : this.clickHistoryItem(K);
      }
      saveChat() {
        typeof this.context.saveChat == "function" ? this.context.saveChat() : typeof this.win.saveChatDebounced == "function" ? this.win.saveChatDebounced() : typeof this.win.saveChat == "function" && this.win.saveChat();
      }
      findCharacterElement(w, L) {
        var Te;
        const K = (u) => (u || "").replace(/\s+/g, "").toLowerCase(), Y = K(w), ee = L && decodeURIComponent(L).replace(/\\/g, "/").split("/").pop() || "", ne = [".character_select", ".character-select", "[data-character-id]", ".ch_card", ".character-item"];
        let X = null;
        for (const u of ne) {
          const d = document.querySelectorAll(u);
          if (d.length) {
            X = d;
            break;
          }
        }
        if (!X)
          return { element: null, index: -1 };
        for (const u of X) {
          const d = K(u.textContent || "") + K(u.getAttribute("ch_name") || "") + K(u.getAttribute("name") || ""), g = ((Te = u.querySelector("img")) == null ? void 0 : Te.getAttribute("src")) || u.getAttribute("avatar") || "", y = g && decodeURIComponent(g).replace(/\\/g, "/").split("/").pop() || "";
          if (d.includes(Y) || ee && y && (y.includes(ee) || ee.includes(y))) {
            let _ = parseInt(u.getAttribute("chid") || u.getAttribute("data-character-id") || u.getAttribute("data-id") || "-1");
            return isNaN(_) && (_ = -1), { element: u, index: _ };
          }
        }
        return { element: null, index: -1 };
      }
      clickHistoryItem(w) {
        const L = w.replace(/\.jsonl?$/, ""), K = L + ".jsonl", Y = [`[chatfile="${K}"]`, `[chatfile="${L}"]`, `[file_name="${L}"]`, `[data-chat-file="${K}"]`];
        for (const ne of Y) {
          const X = document.querySelector(ne);
          if (X)
            return X.click(), !0;
        }
        const ee = document.querySelectorAll('.past_chat_item, .chat-history-item, [class*="history-item"]');
        for (const ne of ee)
          if ((ne.textContent || "").includes(L))
            return ne.click(), !0;
        return !1;
      }
      findMessageElementByText(w) {
        var Y;
        const L = w.replace(/\s+/g, "").substring(0, 30), K = [".mes", ".message", '[class*="mes"]', '[class*="message"]'];
        for (const ee of K) {
          const ne = document.querySelectorAll(ee);
          for (let X = ne.length - 1; X >= 0; X--) {
            const Te = ne[X];
            if ((((Y = Te.querySelector(".mes_text, .message-text, .content")) == null ? void 0 : Y.textContent) || Te.textContent || "").replace(/\s+/g, "").includes(L))
              return Te;
          }
        }
        return null;
      }
      resetCurrentCharacter() {
        this.context.characterId !== void 0 && (this.context.characterId = -1), this.win.this_chid !== void 0 && (this.win.this_chid = -1);
      }
    }
    const n = po(), i = new s(), r = /* @__PURE__ */ we(!0), o = () => {
      r.value = !r.value;
    }, l = /* @__PURE__ */ we(!1), c = /* @__PURE__ */ mn(null), f = /* @__PURE__ */ we({ top: "calc(100% + 5px)", right: "0", bottom: "auto" }), a = /* @__PURE__ */ we(!1), h = /* @__PURE__ */ we(!1), p = /* @__PURE__ */ we(null), m = async () => {
      if (l.value = !l.value, l.value && (await ws(), c.value)) {
        const j = c.value.getBoundingClientRect();
        window.innerHeight - j.bottom < 150 ? f.value = { top: "auto", bottom: "calc(100% + 5px)", right: "0" } : f.value = { top: "calc(100% + 5px)", bottom: "auto", right: "0" };
      }
    }, v = /* @__PURE__ */ mn(null), T = /* @__PURE__ */ we(0), R = He(() => n.currentMessages.length), k = He(() => R.value * ys), D = He(() => {
      const j = v.value;
      if (!j)
        return { start: 0, end: Math.min(R.value, 20) };
      const w = Math.floor(T.value / ys), L = Math.ceil((T.value + j.clientHeight) / ys);
      return {
        start: Math.max(0, w - ji),
        end: Math.min(R.value, L + ji)
      };
    }), N = He(() => {
      const { start: j, end: w } = D.value;
      return n.currentMessages.slice(j, w);
    }), x = (j) => (D.value.start + j) * ys;
    let P = null;
    const Z = () => {
      P !== null && cancelAnimationFrame(P), P = requestAnimationFrame(() => {
        v.value && (T.value = v.value.scrollTop);
      });
    };
    $t(() => n.currentChatId, async () => {
      await ws(), v.value && (v.value.scrollTop = 0, T.value = 0);
    });
    let B = null, O = null;
    const A = (j) => {
      B && clearTimeout(B), B = window.setTimeout(() => {
        O && O.abort(), O = new AbortController(), n.performSearch(j.target.value, O.signal);
      }, 300);
    }, H = new ResizeObserver(() => {
      v.value && (T.value = v.value.scrollTop);
    });
    jn(() => {
      n.fetchChats(), window.refreshChatLogManager = () => n.fetchChats(), v.value && H.observe(v.value);
    }), zn(() => {
      B && clearTimeout(B), O && O.abort(), H.disconnect();
    });
    const q = () => {
      var j;
      return (j = window.closeChatLogManager) == null ? void 0 : j.call(window);
    }, M = (j) => {
      const w = i.getCurrentChatFileName();
      return w ? w.replace(/\.jsonl?$/, "") === j.replace(/\.jsonl?$/, "") : !1;
    }, se = async (j, w, L) => {
      try {
        i.saveChat();
        let { element: K, index: Y } = i.findCharacterElement(j, w);
        if (Y === -1) {
          const ne = i.getCharacters(), X = (d) => (d || "").replace(/\s+/g, "").toLowerCase(), Te = X(j), u = ne.find((d) => X(d.name) === Te);
          u && (Y = ne.indexOf(u));
        }
        if (Y === -1)
          return window.confirm(`自动定位角色【${j}】失败，是否手动在左侧选择该角色后继续？`) && q(), !1;
        q();
        const ee = i.getCurrentCharacterId();
        return String(ee) === String(Y) ? i.clickHistoryItem(L) || i.loadChat(L) : (i.resetCurrentCharacter(), K ? K.click() : i.selectCharacterById(Y), await new Promise((ne) => setTimeout(ne, 500)), i.loadChat(L)), !0;
      } catch {
        return !1;
      }
    }, ye = (j) => {
      if (!j)
        return;
      let w = !1;
      const L = () => {
        const ee = i.findMessageElementByText(j);
        return ee ? (w = !0, ee.scrollIntoView({ behavior: "smooth", block: "center" }), ee.style.transition = "all 0.4s ease", ee.style.boxShadow = "0 0 15px rgba(255, 152, 0, 0.8)", setTimeout(() => ee.style.boxShadow = "", 2e3), !0) : !1;
      };
      if (L())
        return;
      const K = new MutationObserver(() => {
        !w && L() && K.disconnect();
      }), Y = document.getElementById("chat") || document.body;
      K.observe(Y, { childList: !0, subtree: !0 }), setTimeout(() => {
        w || K.disconnect();
      }, 5e3);
    }, Le = async () => {
      const j = n.allChats.find((w) => w.id === n.currentChatId);
      j && await se(j.charName, j.avatarUrl, j.id);
    }, fe = async (j) => {
      const w = n.allChats.find((K) => K.id === n.currentChatId);
      if (!w)
        return;
      await se(w.charName, w.avatarUrl, w.id) && ye(j);
    }, Q = async () => {
      const j = n.allChats.find((Y) => Y.id === n.currentChatId);
      if (!j)
        return;
      const w = M(j.id);
      let L = `⚠️ 确定要永久删除与【${j.charName}】的此条记录吗？`;
      if (w && (L = "🚨 正在删除活跃聊天！将自动切换到历史记录，确定删除？"), !window.confirm(L))
        return;
      if (i.saveChat(), w) {
        const Y = n.allChats.find((ee) => ee.charName === j.charName && ee.id !== j.id);
        Y ? (await se(Y.charName, Y.avatarUrl, Y.id), await new Promise((ee) => setTimeout(ee, 600))) : i.resetCurrentCharacter();
      }
      await Ri(j.charName, j.avatarUrl, j.id) ? (n.currentChatId = null, n.currentMessages = [], n.fetchChats()) : alert("❌ 删除失败");
    }, ce = async () => {
      var L;
      if (n.selectedChatIds.length === 0 || !window.confirm(`🛑 极度危险！将删除 ${n.selectedChatIds.length} 个会话，确定吗？`))
        return;
      a.value = !0;
      let j = 0, w = 0;
      try {
        const K = Array.from(n.selectedChatIds);
        let Y = !1, ee = "";
        for (const ne of K)
          if (M(ne)) {
            Y = !0, ee = ((L = n.allChats.find((X) => X.id === ne)) == null ? void 0 : L.charName) || "";
            break;
          }
        if (i.saveChat(), Y) {
          const ne = n.allChats.find((X) => X.charName === ee && !K.includes(X.id));
          ne ? (await se(ne.charName, ne.avatarUrl, ne.id), await new Promise((X) => setTimeout(X, 600))) : i.resetCurrentCharacter();
        }
        for (const ne of K) {
          const X = n.allChats.find((Te) => Te.id === ne);
          X && await Ri(X.charName, X.avatarUrl, X.id) ? j++ : w++;
        }
      } finally {
        a.value = !1, n.selectedChatIds = [], n.isBatchMode = !1, alert(`🗑️ 完毕！成功: ${j}${w > 0 ? ` 失败: ${w}` : ""}`), n.fetchChats();
      }
    };
    async function lt(j, w) {
      const L = [];
      let K = 0;
      const Y = async () => {
        if (K >= w.length)
          return;
        const ee = K++;
        try {
          L[ee] = await w[ee]();
        } catch {
          L[ee] = null;
        }
        await Y();
      };
      return await Promise.all(Array(Math.min(j, w.length)).fill(null).map(() => Y())), L;
    }
    const mt = (j) => {
      l.value = !1;
      const w = n.allChats.find((L) => L.id === n.currentChatId);
      w && (j === "txt" ? Va(w.title, n.currentMessages) : j === "md" ? Ka(w.title, n.currentMessages) : j === "jsonl" && Ua(w.title, w.charName, n.currentMessages));
    }, Ke = async (j) => {
      if (n.selectedChatIds.length !== 0) {
        a.value = !0;
        try {
          const w = Array.from(n.selectedChatIds).map((K) => async () => {
            const Y = n.allChats.find((ee) => ee.id === K);
            if (Y) {
              const ee = await An(Y.charName, Y.avatarUrl, Y.id);
              return { title: Y.title, charName: Y.charName, messages: ee };
            }
            return null;
          }), L = await lt(5, w);
          Ja(L.filter((K) => K !== null), j);
        } finally {
          a.value = !1;
        }
      }
    }, ke = () => {
      p.value && p.value.click();
    }, ps = async (j) => {
      const w = j.target.files;
      if (!w || w.length === 0)
        return;
      h.value = !0;
      let L = 0, K = 0;
      try {
        for (let Y = 0; Y < w.length; Y++) {
          const ee = await w[Y].text();
          await new Promise((ne) => {
            t(async () => {
              var u, d, g;
              let X;
              try {
                X = JSON.parse(ee);
              } catch {
                X = ee.split(`
`).filter((y) => y.trim()).map((y) => JSON.parse(y));
              }
              let Te = Array.isArray(X) ? (u = X[0]) != null && u.messages ? X : (d = X[0]) != null && d.chat_metadata ? [{ charName: X[0].character_name, messages: X.slice(1) }] : [{ messages: X }] : [];
              for (const y of Te) {
                const _ = y.messages.filter((C) => C.mes !== void 0);
                if (_.length === 0)
                  continue;
                let b = y.charName || ((g = _.find((C) => !C.is_user && C.name)) == null ? void 0 : g.name) || "", I = n.allChats.find((C) => C.charName === b || b.includes(C.charName)) || n.allChats.find((C) => C.id === n.currentChatId);
                I && await ua(_, I.avatarUrl, I.charName) ? L++ : K++;
              }
              ne(null);
            });
          });
        }
      } finally {
        h.value = !1, p.value && (p.value.value = ""), alert(`🎉 导入完毕！成功: ${L}${K > 0 ? ` 失败: ${K}` : ""}`), n.fetchChats();
      }
    };
    return (j, w) => (pe(), ge("div", {
      class: "log-manager-modal",
      onClick: wn(q, ["self"])
    }, [
      J("div", {
        class: Ot(["log-manager-container", r.value ? "theme-dark" : "theme-light"])
      }, [
        J("header", qa, [
          w[9] || (w[9] = J("h2", null, "📚 聊天记录总览", -1)),
          J("div", Ya, [
            J("button", {
              class: "action-btn import-btn",
              onClick: ke,
              disabled: h.value
            }, Se(h.value ? "导入中..." : "📥 导入"), 9, Ga),
            J("input", {
              type: "file",
              ref_key: "fileInputRef",
              ref: p,
              style: { display: "none" },
              accept: ".json,.jsonl",
              multiple: "",
              onChange: ps
            }, null, 544),
            J("button", {
              class: Ot(["action-btn toggle-batch-btn", { active: te(n).isBatchMode }]),
              onClick: w[0] || (w[0] = //@ts-ignore
              (...L) => te(n).toggleBatchMode && te(n).toggleBatchMode(...L))
            }, Se(te(n).isBatchMode ? "退出批量" : "☑️ 批量"), 3),
            J("button", {
              class: "icon-btn",
              onClick: o,
              title: r.value ? "切换亮色" : "切换暗色"
            }, Se(r.value ? "🌞" : "🌙"), 9, Xa),
            J("button", {
              class: "icon-btn close-btn",
              onClick: q,
              title: "关闭"
            }, "✕")
          ])
        ]),
        J("main", Qa, [
          J("aside", Za, [
            J("div", eu, [
              J("div", tu, [
                J("input", {
                  type: "text",
                  placeholder: te(n).isIndexing ? "后台加载中..." : "搜索全局内容...",
                  class: "search-input",
                  onInput: A,
                  disabled: te(n).isBatchMode
                }, null, 40, su),
                te(n).isIndexing ? (pe(), ge("span", nu, "⌛")) : tt("", !0)
              ])
            ]),
            te(n).isBatchMode ? (pe(), ge("div", iu, [
              J("input", {
                type: "checkbox",
                id: "selectAllBox",
                class: "batch-checkbox",
                checked: te(n).isAllSelected,
                onChange: w[1] || (w[1] = //@ts-ignore
                (...L) => te(n).toggleSelectAll && te(n).toggleSelectAll(...L))
              }, null, 40, ru),
              J("label", ou, "全选 " + Se(te(n).searchQuery ? "搜索结果" : "所有会话"), 1)
            ])) : tt("", !0),
            $e(Wa)
          ]),
          J("section", lu, [
            J("div", cu, [
              J("h3", null, Se(te(n).isBatchMode ? "批量操作面板" : "消息预览"), 1),
              !te(n).isBatchMode && te(n).currentChatId ? (pe(), ge("div", au, [
                J("button", {
                  class: "action-btn jump-chat-btn",
                  onClick: Le
                }, "🚀 进入"),
                J("button", {
                  class: "action-btn delete-btn-sm",
                  onClick: Q
                }, "🗑️"),
                J("div", {
                  class: "export-dropdown",
                  ref_key: "exportWrapperRef",
                  ref: c
                }, [
                  J("button", {
                    class: "action-btn",
                    onClick: m
                  }, "📤 导出 ▾"),
                  $e(bc, { name: "fade-slide" }, {
                    default: Cr(() => [
                      l.value ? (pe(), ge("div", {
                        key: 0,
                        class: "dropdown-menu",
                        style: St(f.value)
                      }, [
                        J("div", {
                          class: "dropdown-item",
                          onClick: w[2] || (w[2] = (L) => mt("md"))
                        }, "📄 Markdown"),
                        J("div", {
                          class: "dropdown-item",
                          onClick: w[3] || (w[3] = (L) => mt("txt"))
                        }, "📝 TXT 纯文本"),
                        J("div", {
                          class: "dropdown-item",
                          onClick: w[4] || (w[4] = (L) => mt("jsonl"))
                        }, "📦 官方 JSONL")
                      ], 4)) : tt("", !0)
                    ]),
                    _: 1
                  })
                ], 512)
              ])) : tt("", !0)
            ]),
            te(n).isBatchMode ? (pe(), ge("div", uu, [
              J("div", fu, [
                J("h3", null, "已选择 " + Se(te(n).selectedChatIds.length) + " 个会话", 1),
                te(n).selectedChatIds.length === 0 ? (pe(), ge("p", hu, "请在左侧勾选操作项")) : tt("", !0)
              ]),
              te(n).selectedChatIds.length > 0 ? (pe(), ge("div", du, [
                J("button", {
                  class: "big-btn md-btn",
                  onClick: w[5] || (w[5] = (L) => Ke("md")),
                  disabled: a.value
                }, Se(a.value ? "处理中..." : "📥 导出为 Markdown"), 9, pu),
                J("button", {
                  class: "big-btn txt-btn",
                  onClick: w[6] || (w[6] = (L) => Ke("txt")),
                  disabled: a.value
                }, Se(a.value ? "处理中..." : "📥 导出为 TXT"), 9, gu),
                J("button", {
                  class: "big-btn json-btn",
                  onClick: w[7] || (w[7] = (L) => Ke("json")),
                  disabled: a.value
                }, Se(a.value ? "处理中..." : "📦 导出为 JSON"), 9, mu),
                w[10] || (w[10] = J("div", { class: "divider" }, null, -1)),
                J("button", {
                  class: "big-btn delete-btn",
                  onClick: ce,
                  disabled: a.value
                }, Se(a.value ? "删除中..." : "🗑️ 永久删除记录"), 9, vu)
              ])) : tt("", !0)
            ])) : (pe(), ge("div", {
              key: 1,
              class: "message-container",
              ref_key: "scrollContainer",
              ref: v,
              onScroll: Z,
              onClick: w[8] || (w[8] = (L) => l.value = !1)
            }, [
              te(n).currentChatId ? (pe(), ge("div", {
                key: 1,
                class: "messages",
                style: St({ height: k.value + "px" })
              }, [
                (pe(!0), ge(Be, null, Rr(N.value, (L, K) => (pe(), ge("div", {
                  key: K,
                  style: St({ transform: `translateY(${x(K)}px)` }),
                  class: "message-bubble-wrapper"
                }, [
                  J("div", {
                    class: Ot(["message-bubble", L.is_user ? "is-user" : "is-bot"])
                  }, [
                    J("button", {
                      class: "msg-jump-btn",
                      onClick: wn((Y) => fe(L.mes), ["stop"]),
                      title: "跳转到原文位置"
                    }, "🎯", 8, yu),
                    J("strong", null, Se(L.name || (L.is_user ? "You" : "Bot")) + ":", 1),
                    J("p", bu, Se(L.mes), 1)
                  ], 2)
                ], 4))), 128))
              ], 4)) : (pe(), ge("div", _u, "👈 请在左侧选择角色或搜索内容"))
            ], 544))
          ])
        ])
      ], 2)
    ]));
  }
});
const xu = /* @__PURE__ */ mo(Su, [["__scopeId", "data-v-91df1db2"]]), vo = "chat-log-manager-float-pos";
function Cu() {
  try {
    const e = localStorage.getItem(vo);
    if (e) {
      const t = JSON.parse(e), s = window.innerWidth - 50, n = window.innerHeight - 50;
      return { x: Math.max(0, Math.min(t.x, s)), y: Math.max(0, Math.min(t.y, n)) };
    }
  } catch {
  }
  return null;
}
function zi(e, t) {
  localStorage.setItem(vo, JSON.stringify({ x: e, y: t }));
}
function Bi() {
  try {
    let e = function() {
      n.classList.remove("idle-transparent"), clearTimeout(a), a = setTimeout(() => {
        n.classList.add("idle-transparent");
      }, 3e3);
    }, t = function(h, p) {
      const m = h - o, v = p - l;
      (Math.abs(m) > 5 || Math.abs(v) > 5) && (r = !0), n.style.left = Math.max(0, Math.min(c + m, window.innerWidth - n.offsetWidth)) + "px", n.style.top = Math.max(0, Math.min(f + v, window.innerHeight - n.offsetHeight)) + "px";
    };
    if (document.getElementById("chat-log-manager-float-btn"))
      return;
    const s = document.createElement("style");
    s.innerHTML = `
      #chat-log-manager-float-btn { position: fixed; border-radius: 50%; background: rgba(92, 87, 80, 0.85); color: #F9F1DB; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 99999; border: 1px solid rgba(255,255,255,0.1); user-select: none; touch-action: none; width: 44px; height: 44px; font-size: 20px; transition: all 0.3s ease; opacity: 0.85; }
      #chat-log-manager-float-btn:hover { transform: scale(1.1); opacity: 1; }
      @media (max-width: 768px) { #chat-log-manager-float-btn { width: 36px; height: 36px; font-size: 16px; } #chat-log-manager-float-btn.idle-transparent { opacity: 0.3 !important; transform: scale(0.9); } }
    `, document.head.appendChild(s);
    const n = document.createElement("div");
    n.id = "chat-log-manager-float-btn", n.innerHTML = "📚";
    const i = Cu();
    i ? (n.style.left = i.x + "px", n.style.top = i.y + "px") : (n.style.left = window.innerWidth - 64 + "px", n.style.top = window.innerHeight - 200 + "px");
    let r = !1, o, l, c, f, a = null;
    e(), n.addEventListener("mousedown", (h) => {
      if (h.button !== 0)
        return;
      e(), o = h.clientX, l = h.clientY;
      const p = n.getBoundingClientRect();
      c = p.left, f = p.top, n.style.transition = "none";
      const m = (T) => t(T.clientX, T.clientY), v = () => {
        document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", v), n.style.transition = "all 0.3s ease", r && zi(parseInt(n.style.left), parseInt(n.style.top)), setTimeout(() => r = !1, 50), e();
      };
      document.addEventListener("mousemove", m), document.addEventListener("mouseup", v);
    }), n.addEventListener("touchstart", (h) => {
      e();
      const p = h.touches[0];
      o = p.clientX, l = p.clientY;
      const m = n.getBoundingClientRect();
      c = m.left, f = m.top;
      const v = (R) => t(R.touches[0].clientX, R.touches[0].clientY), T = () => {
        document.removeEventListener("touchmove", v), document.removeEventListener("touchend", T), r && zi(parseInt(n.style.left), parseInt(n.style.top)), setTimeout(() => r = !1, 50), e();
      };
      document.addEventListener("touchmove", v, { passive: !1 }), document.addEventListener("touchend", T);
    }), n.addEventListener("click", () => {
      r || wu();
    }), document.body.appendChild(n);
  } catch {
  }
}
function wu() {
  let e = document.getElementById("chat-log-manager-container");
  if (e)
    e.style.display = "block";
  else {
    e = document.createElement("div"), e.id = "chat-log-manager-container", e.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 99998; backdrop-filter: blur(3px);", document.body.appendChild(e);
    const t = qc(xu), s = Xc();
    s.use(ca), t.use(s), t.mount(e);
  }
  typeof window.refreshChatLogManager == "function" && window.refreshChatLogManager();
}
window.closeChatLogManager = () => {
  const e = document.getElementById("chat-log-manager-container");
  e && (e.style.display = "none");
};
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Bi) : Bi();
