import { C as e, S as t, _ as n, b as r, c as i, d as a, f as o, g as s, h as c, l, n as u, o as d, p as f, r as p, s as m, t as h, u as g, v as _, x as v, y } from "./three.module-B8tJV-Xx.js";
//#region node_modules/.pnpm/@vue+shared@3.5.39/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function b(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var x = {}, S = [], C = () => {}, w = () => !1, T = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), E = (e) => e.startsWith("onUpdate:"), D = Object.assign, O = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, ee = Object.prototype.hasOwnProperty, k = (e, t) => ee.call(e, t), A = Array.isArray, te = (e) => I(e) === "[object Map]", j = (e) => I(e) === "[object Set]", ne = (e) => I(e) === "[object Date]", M = (e) => typeof e == "function", N = (e) => typeof e == "string", P = (e) => typeof e == "symbol", F = (e) => typeof e == "object" && !!e, re = (e) => (F(e) || M(e)) && M(e.then) && M(e.catch), ie = Object.prototype.toString, I = (e) => ie.call(e), ae = (e) => I(e).slice(8, -1), oe = (e) => I(e) === "[object Object]", se = (e) => N(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ce = /* @__PURE__ */ b(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), L = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, le = /-\w/g, R = L((e) => e.replace(le, (e) => e.slice(1).toUpperCase())), ue = /\B([A-Z])/g, de = L((e) => e.replace(ue, "-$1").toLowerCase()), fe = L((e) => e.charAt(0).toUpperCase() + e.slice(1)), pe = L((e) => e ? `on${fe(e)}` : ""), me = (e, t) => !Object.is(e, t), he = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, ge = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, _e = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ve = (e) => {
	let t = N(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ye, be = () => ye ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function xe(e) {
	if (A(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = N(r) ? Te(r) : xe(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (N(e) || F(e)) return e;
}
var Se = /;(?![^(]*\))/g, Ce = /:([^]+)/, we = /\/\*[^]*?\*\//g;
function Te(e) {
	let t = {};
	return e.replace(we, "").split(Se).forEach((e) => {
		if (e) {
			let n = e.split(Ce);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Ee(e) {
	let t = "";
	if (N(e)) t = e;
	else if (A(e)) for (let n = 0; n < e.length; n++) {
		let r = Ee(e[n]);
		r && (t += r + " ");
	}
	else if (F(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var De = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oe = /* @__PURE__ */ b(De);
De + "";
function ke(e) {
	return !!e || e === "";
}
function Ae(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = je(e[r], t[r]);
	return n;
}
function je(e, t) {
	if (e === t) return !0;
	let n = ne(e), r = ne(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = P(e), r = P(t), n || r) return e === t;
	if (n = A(e), r = A(t), n || r) return n && r ? Ae(e, t) : !1;
	if (n = F(e), r = F(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !je(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
var Me = (e) => !!(e && e.__v_isRef === !0), Ne = (e) => N(e) ? e : e == null ? "" : A(e) || F(e) && (e.toString === ie || !M(e.toString)) ? Me(e) ? Ne(e.value) : JSON.stringify(e, Pe, 2) : String(e), Pe = (e, t) => Me(t) ? Pe(e, t.value) : te(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Fe(t, r) + " =>"] = n, e), {}) } : j(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Fe(e)) } : P(t) ? Fe(t) : F(t) && !A(t) && !oe(t) ? String(t) : t, Fe = (e, t = "") => P(e) ? `Symbol(${e.description ?? t})` : e, z, Ie = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && z && (z.active ? (this.parent = z, this.index = (z.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = z;
			try {
				return z = this, e();
			} finally {
				z = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = z, z = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (z === this) z = this.prevScope;
			else {
				let e = z;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Le() {
	return z;
}
var B, Re = /* @__PURE__ */ new WeakSet(), ze = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, z && (z.active ? z.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Re.has(this) && (Re.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ue(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, nt(this), Ke(this);
		let e = B, t = Qe;
		B = this, Qe = !0;
		try {
			return this.fn();
		} finally {
			qe(this), B = e, Qe = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Xe(e);
			this.deps = this.depsTail = void 0, nt(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Re.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Je(this) && this.run();
	}
	get dirty() {
		return Je(this);
	}
}, Be = 0, Ve, He;
function Ue(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = He, He = e;
		return;
	}
	e.next = Ve, Ve = e;
}
function We() {
	Be++;
}
function Ge() {
	if (--Be > 0) return;
	if (He) {
		let e = He;
		for (He = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ve;) {
		let t = Ve;
		for (Ve = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Ke(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function qe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Xe(r), Ze(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Je(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ye(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ye(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rt) || (e.globalVersion = rt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Je(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = B, r = Qe;
	B = e, Qe = !0;
	try {
		Ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || me(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		B = n, Qe = r, qe(e), e.flags &= -3;
	}
}
function Xe(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Xe(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ze(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Qe = !0, $e = [];
function et() {
	$e.push(Qe), Qe = !1;
}
function tt() {
	let e = $e.pop();
	Qe = e === void 0 ? !0 : e;
}
function nt(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = B;
		B = void 0;
		try {
			t();
		} finally {
			B = e;
		}
	}
}
var rt = 0, it = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, at = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!B || !Qe || B === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== B) t = this.activeLink = new it(B, this), B.deps ? (t.prevDep = B.depsTail, B.depsTail.nextDep = t, B.depsTail = t) : B.deps = B.depsTail = t, ot(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = B.depsTail, t.nextDep = void 0, B.depsTail.nextDep = t, B.depsTail = t, B.deps === t && (B.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, rt++, this.notify(e);
	}
	notify(e) {
		We();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ge();
		}
	}
};
function ot(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) ot(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var st = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ Symbol(""), lt = /* @__PURE__ */ Symbol(""), ut = /* @__PURE__ */ Symbol("");
function V(e, t, n) {
	if (Qe && B) {
		let t = st.get(e);
		t || st.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new at()), r.map = t, r.key = n), r.track();
	}
}
function dt(e, t, n, r, i, a) {
	let o = st.get(e);
	if (!o) {
		rt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (We(), t === "clear") o.forEach(s);
	else {
		let i = A(e), a = i && se(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ut || !P(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ut)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ct)), te(e) && s(o.get(lt)));
				break;
			case "delete":
				i || (s(o.get(ct)), te(e) && s(o.get(lt)));
				break;
			case "set":
				te(e) && s(o.get(ct));
				break;
		}
	}
	Ge();
}
function ft(e, t) {
	let n = st.get(e);
	return n && n.get(t);
}
function pt(e) {
	let t = /* @__PURE__ */ H(e);
	return t === e ? t : (V(t, "iterate", ut), /* @__PURE__ */ Qt(e) ? t : t.map(tn));
}
function mt(e) {
	return V(e = /* @__PURE__ */ H(e), "iterate", ut), e;
}
function ht(e, t) {
	return /* @__PURE__ */ Zt(e) ? nn(/* @__PURE__ */ Xt(e) ? tn(t) : t) : tn(t);
}
var gt = {
	__proto__: null,
	[Symbol.iterator]() {
		return _t(this, Symbol.iterator, (e) => ht(this, e));
	},
	concat(...e) {
		return pt(this).concat(...e.map((e) => A(e) ? pt(e) : e));
	},
	entries() {
		return _t(this, "entries", (e) => (e[1] = ht(this, e[1]), e));
	},
	every(e, t) {
		return yt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return yt(this, "filter", e, t, (e) => e.map((e) => ht(this, e)), arguments);
	},
	find(e, t) {
		return yt(this, "find", e, t, (e) => ht(this, e), arguments);
	},
	findIndex(e, t) {
		return yt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return yt(this, "findLast", e, t, (e) => ht(this, e), arguments);
	},
	findLastIndex(e, t) {
		return yt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return yt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return xt(this, "includes", e);
	},
	indexOf(...e) {
		return xt(this, "indexOf", e);
	},
	join(e) {
		return pt(this).join(e);
	},
	lastIndexOf(...e) {
		return xt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return yt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return St(this, "pop");
	},
	push(...e) {
		return St(this, "push", e);
	},
	reduce(e, ...t) {
		return bt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return bt(this, "reduceRight", e, t);
	},
	shift() {
		return St(this, "shift");
	},
	some(e, t) {
		return yt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return St(this, "splice", e);
	},
	toReversed() {
		return pt(this).toReversed();
	},
	toSorted(e) {
		return pt(this).toSorted(e);
	},
	toSpliced(...e) {
		return pt(this).toSpliced(...e);
	},
	unshift(...e) {
		return St(this, "unshift", e);
	},
	values() {
		return _t(this, "values", (e) => ht(this, e));
	}
};
function _t(e, t, n) {
	let r = mt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Qt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var vt = Array.prototype;
function yt(e, t, n, r, i, a) {
	let o = mt(e), s = o !== e && !/* @__PURE__ */ Qt(e), c = o[t];
	if (c !== vt[t]) {
		let t = c.apply(e, a);
		return s ? tn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, ht(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function bt(e, t, n, r) {
	let i = mt(e), a = i !== e && !/* @__PURE__ */ Qt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = ht(e, t)), n.call(this, t, ht(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? ht(e, c) : c;
}
function xt(e, t, n) {
	let r = /* @__PURE__ */ H(e);
	V(r, "iterate", ut);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ $t(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), r[t](...n)) : i;
}
function St(e, t, n = []) {
	et(), We();
	let r = (/* @__PURE__ */ H(e))[t].apply(e, n);
	return Ge(), tt(), r;
}
var Ct = /* @__PURE__ */ b("__proto__,__v_isRef,__isVue"), wt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(P));
function Tt(e) {
	P(e) || (e = String(e));
	let t = /* @__PURE__ */ H(this);
	return V(t, "has", e), t.hasOwnProperty(e);
}
var Et = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Wt : Ut : i ? Ht : Vt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = A(e);
		if (!r) {
			let e;
			if (a && (e = gt[t])) return e;
			if (t === "hasOwnProperty") return Tt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ U(e) ? e : n);
		if ((P(t) ? wt.has(t) : Ct(t)) || (r || V(e, "get", t), i)) return o;
		if (/* @__PURE__ */ U(o)) {
			let e = a && se(t) ? o : o.value;
			return r && F(e) ? /* @__PURE__ */ Jt(e) : e;
		}
		return F(o) ? r ? /* @__PURE__ */ Jt(o) : /* @__PURE__ */ Kt(o) : o;
	}
}, Dt = class extends Et {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = A(e) && se(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Zt(i);
			if (!/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (i = /* @__PURE__ */ H(i), n = /* @__PURE__ */ H(n)), !a && /* @__PURE__ */ U(i) && !/* @__PURE__ */ U(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : k(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ U(e) ? e : r);
		return e === /* @__PURE__ */ H(r) && s && (o ? me(n, i) && dt(e, "set", t, n, i) : dt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = k(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && dt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!P(t) || !wt.has(t)) && V(e, "has", t), n;
	}
	ownKeys(e) {
		return V(e, "iterate", A(e) ? "length" : ct), Reflect.ownKeys(e);
	}
}, Ot = class extends Et {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, kt = /* @__PURE__ */ new Dt(), At = /* @__PURE__ */ new Ot(), jt = /* @__PURE__ */ new Dt(!0), Mt = (e) => e, Nt = (e) => Reflect.getPrototypeOf(e);
function Pt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ H(i), o = te(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Mt : t ? nn : tn;
		return !t && V(a, "iterate", c ? lt : ct), D(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Ft(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function It(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ H(r), a = /* @__PURE__ */ H(n);
			e || (me(n, a) && V(i, "get", n), V(i, "get", a));
			let { has: o } = Nt(i), s = t ? Mt : e ? nn : tn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && V(/* @__PURE__ */ H(t), "iterate", ct), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ H(n), i = /* @__PURE__ */ H(t);
			return e || (me(t, i) && V(r, "has", t), V(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ H(a), s = t ? Mt : e ? nn : tn;
			return !e && V(o, "iterate", ct), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return D(n, e ? {
		add: Ft("add"),
		set: Ft("set"),
		delete: Ft("delete"),
		clear: Ft("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ H(this), r = Nt(n), i = /* @__PURE__ */ H(e), a = !t && !/* @__PURE__ */ Qt(e) && !/* @__PURE__ */ Zt(e) ? i : e;
			return r.has.call(n, a) || me(e, a) && r.has.call(n, e) || me(i, a) && r.has.call(n, i) || (n.add(a), dt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Qt(n) && !/* @__PURE__ */ Zt(n) && (n = /* @__PURE__ */ H(n));
			let r = /* @__PURE__ */ H(this), { has: i, get: a } = Nt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ H(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? me(n, s) && dt(r, "set", e, n, s) : dt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ H(this), { has: n, get: r } = Nt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ H(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && dt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ H(this), t = e.size !== 0, n = e.clear();
			return t && dt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Pt(r, e, t);
	}), n;
}
function Lt(e, t) {
	let n = It(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(k(n, r) && r in t ? n : t, r, i);
}
var Rt = { get: /* @__PURE__ */ Lt(!1, !1) }, zt = { get: /* @__PURE__ */ Lt(!1, !0) }, Bt = { get: /* @__PURE__ */ Lt(!0, !1) }, Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap();
function Gt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return /* @__PURE__ */ Zt(e) ? e : Yt(e, !1, kt, Rt, Vt);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return Yt(e, !1, jt, zt, Ht);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !0, At, Bt, Ut);
}
function Yt(e, t, n, r, i) {
	if (!F(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Gt(ae(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return /* @__PURE__ */ Zt(e) ? /* @__PURE__ */ Xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ H(t) : e;
}
function en(e) {
	return !k(e, "__v_skip") && Object.isExtensible(e) && ge(e, "__v_skip", !0), e;
}
var tn = (e) => F(e) ? /* @__PURE__ */ Kt(e) : e, nn = (e) => F(e) ? /* @__PURE__ */ Jt(e) : e;
// @__NO_SIDE_EFFECTS__
function U(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function W(e) {
	return an(e, !1);
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return an(e, !0);
}
function an(e, t) {
	return /* @__PURE__ */ U(e) ? e : new on(e, t);
}
var on = class {
	constructor(e, t) {
		this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ H(e), this._value = t ? e : tn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qt(e) || /* @__PURE__ */ Zt(e);
		e = n ? e : /* @__PURE__ */ H(e), me(e, t) && (this._rawValue = e, this._value = n ? e : tn(e), this.dep.trigger());
	}
};
function G(e) {
	return /* @__PURE__ */ U(e) ? e.value : e;
}
var sn = {
	get: (e, t, n) => t === "__v_raw" ? e : G(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ U(i) && !/* @__PURE__ */ U(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function cn(e) {
	return /* @__PURE__ */ Xt(e) ? e : new Proxy(e, sn);
}
var ln = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = P(t) ? t : String(t), this._raw = /* @__PURE__ */ H(e);
		let r = !0, i = e;
		if (!A(e) || P(this._key) || !se(this._key)) do
			r = !/* @__PURE__ */ $t(i) || /* @__PURE__ */ Qt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = G(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ U(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ U(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return ft(this._raw, this._key);
	}
}, un = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function dn(e, t, n) {
	return /* @__PURE__ */ U(e) ? e : M(e) ? new un(e) : F(e) && arguments.length > 1 ? fn(e, t, n) : /* @__PURE__ */ W(e);
}
function fn(e, t, n) {
	return new ln(e, t, n);
}
var pn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && B !== this) return Ue(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ye(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function mn(e, t, n = !1) {
	let r, i;
	return M(e) ? r = e : (r = e.get, i = e.set), new pn(r, i, n);
}
var hn = {}, gn = /* @__PURE__ */ new WeakMap(), _n = void 0;
function vn(e, t = !1, n = _n) {
	if (n) {
		let t = gn.get(n);
		t || gn.set(n, t = []), t.push(e);
	}
}
function yn(e, t, n = x) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ Qt(e) || i === !1 || i === 0 ? bn(e, 1) : bn(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ U(e) ? (d = () => e.value, m = /* @__PURE__ */ Qt(e)) : /* @__PURE__ */ Xt(e) ? (d = () => l(e), m = !0) : A(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ Xt(e) || /* @__PURE__ */ Qt(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ U(e)) return e.value;
		if (/* @__PURE__ */ Xt(e)) return l(e);
		if (M(e)) return c ? c(e, 2) : e();
	})) : d = M(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			et();
			try {
				f();
			} finally {
				tt();
			}
		}
		let t = _n;
		_n = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			_n = t;
		}
	} : C, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => bn(e(), t);
	}
	let g = Le(), _ = () => {
		u.stop(), g && g.active && O(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return _(), n;
		};
	}
	let v = h ? Array(e.length).fill(hn) : hn, y = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => me(e, v[t])) : me(n, v))) {
				f && f();
				let e = _n;
				_n = u;
				try {
					let e = [
						n,
						v === hn ? void 0 : h && v[0] === hn ? [] : v,
						p
					];
					v = n, c ? c(t, 3, e) : t(...e);
				} finally {
					_n = e;
				}
			}
		} else u.run();
	};
	return s && s(y), u = new ze(d), u.scheduler = o ? () => o(y, !1) : y, p = (e) => vn(e, !1, u), f = u.onStop = () => {
		let e = gn.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			gn.delete(u);
		}
	}, t ? r ? y(!0) : v = u.run() : o ? o(y.bind(null, !0), !0) : u.run(), _.pause = u.pause.bind(u), _.resume = u.resume.bind(u), _.stop = _, _;
}
function bn(e, t = Infinity, n) {
	if (t <= 0 || !F(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ U(e)) bn(e.value, t, n);
	else if (A(e)) for (let r = 0; r < e.length; r++) bn(e[r], t, n);
	else if (j(e) || te(e)) e.forEach((e) => {
		bn(e, t, n);
	});
	else if (oe(e)) {
		for (let r in e) bn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && bn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/@vue+runtime-core@3.5.39/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function xn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Cn(e, t, n);
	}
}
function Sn(e, t, n, r) {
	if (M(e)) {
		let i = xn(e, t, n, r);
		return i && re(i) && i.catch((e) => {
			Cn(e, t, n);
		}), i;
	}
	if (A(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Sn(e[a], t, n, r));
		return i;
	}
}
function Cn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || x;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			et(), xn(a, null, 10, [
				e,
				i,
				o
			]), tt();
			return;
		}
	}
	wn(e, n, i, r, o);
}
function wn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Tn = [], En = -1, Dn = [], On = null, kn = 0, An = /* @__PURE__ */ Promise.resolve(), jn = null;
function Mn(e) {
	let t = jn || An;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nn(e) {
	let t = En + 1, n = Tn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Tn[r], a = zn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Pn(e) {
	if (!(e.flags & 1)) {
		let t = zn(e), n = Tn[Tn.length - 1];
		!n || !(e.flags & 2) && t >= zn(n) ? Tn.push(e) : Tn.splice(Nn(t), 0, e), e.flags |= 1, Fn();
	}
}
function Fn() {
	jn ||= An.then(Bn);
}
function In(e) {
	A(e) ? Dn.push(...e) : On && e.id === -1 ? On.splice(kn + 1, 0, e) : e.flags & 1 || (Dn.push(e), e.flags |= 1), Fn();
}
function Ln(e, t, n = En + 1) {
	for (; n < Tn.length; n++) {
		let t = Tn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			Tn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Rn(e) {
	if (Dn.length) {
		let e = [...new Set(Dn)].sort((e, t) => zn(e) - zn(t));
		if (Dn.length = 0, On) {
			On.push(...e);
			return;
		}
		for (On = e, kn = 0; kn < On.length; kn++) {
			let e = On[kn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		On = null, kn = 0;
	}
}
var zn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Bn(e) {
	try {
		for (En = 0; En < Tn.length; En++) {
			let e = Tn[En];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), xn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; En < Tn.length; En++) {
			let e = Tn[En];
			e && (e.flags &= -2);
		}
		En = -1, Tn.length = 0, Rn(e), jn = null, (Tn.length || Dn.length) && Bn(e);
	}
}
var Vn = null, Hn = null;
function Un(e) {
	let t = Vn;
	return Vn = e, Hn = e && e.type.__scopeId || null, t;
}
function Wn(e, t = Vn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && pa(-1);
		let i = Un(t), a;
		try {
			a = e(...n);
		} finally {
			Un(i), r._d && pa(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Gn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (et(), Sn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), tt());
	}
}
function Kn(e, t) {
	if (Na) {
		let n = Na.provides, r = Na.parent && Na.parent.provides;
		r === n && (n = Na.provides = Object.create(r)), n[e] = t;
	}
}
function qn(e, t, n = !1) {
	let r = Pa();
	if (r || gi) {
		let i = gi ? gi._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && M(t) ? t.call(r && r.proxy) : t;
	}
}
var Jn = /* @__PURE__ */ Symbol.for("v-scx"), Yn = () => qn(Jn);
function Xn(e, t, n) {
	return Zn(e, t, n);
}
function Zn(e, t, n = x) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = D({}, n), c = t && r || !t && a !== "post", l;
	if (Ba) {
		if (a === "sync") {
			let e = Yn();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = C, e.resume = C, e.pause = C, e;
		}
	}
	let u = Na;
	s.call = (e, t, n) => Sn(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		qi(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : Pn(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = yn(e, t, s);
	return Ba && (l ? l.push(f) : c && f()), f;
}
function Qn(e, t, n) {
	let r = this.proxy, i = N(e) ? e.includes(".") ? $n(r, e) : () => r[e] : e.bind(r, r), a;
	M(t) ? a = t : (a = t.handler, n = t);
	let o = La(this), s = Zn(i, a.bind(r), n);
	return o(), s;
}
function $n(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var er = /* @__PURE__ */ Symbol("_vte"), tr = (e) => e.__isTeleport, nr = /* @__PURE__ */ Symbol("_leaveCb"), rr = /* @__PURE__ */ Symbol("_enterCb");
function ir() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Mr(() => {
		e.isMounted = !0;
	}), Fr(() => {
		e.isUnmounting = !0;
	}), e;
}
var ar = [Function, Array], or = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: ar,
	onEnter: ar,
	onAfterEnter: ar,
	onEnterCancelled: ar,
	onBeforeLeave: ar,
	onLeave: ar,
	onAfterLeave: ar,
	onLeaveCancelled: ar,
	onBeforeAppear: ar,
	onAppear: ar,
	onAfterAppear: ar,
	onAppearCancelled: ar
}, sr = (e) => {
	let t = e.subTree;
	return t.component ? sr(t.component) : t;
}, cr = {
	name: "BaseTransition",
	props: or,
	setup(e, { slots: t }) {
		let n = Pa(), r = ir();
		return () => {
			let i = t.default && gr(t.default(), !0), a = i && i.length ? lr(i) : n.subTree ? wa() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ H(e), { mode: s } = o;
			if (r.isLeaving) return pr(a);
			let c = mr(a);
			if (!c) return pr(a);
			let l = fr(c, o, r, n, (e) => l = e);
			c.type !== sa && hr(c, l);
			let u = n.subTree && mr(n.subTree);
			if (u && u.type !== sa && !_a(u, c) && sr(n).type !== sa) {
				let e = fr(u, o, r, n);
				if (hr(u, e), s === "out-in" && c.type !== sa) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, pr(a);
				s === "in-out" && c.type !== sa ? e.delayLeave = (e, t, n) => {
					let i = dr(r, u);
					i[String(u.key)] = u, e[nr] = () => {
						t(), e[nr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function lr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== sa) {
			t = n;
			break;
		}
	}
	return t;
}
var ur = cr;
function dr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function fr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: p, onAfterLeave: m, onLeaveCancelled: h, onBeforeAppear: g, onAppear: _, onAfterAppear: v, onAppearCancelled: y } = t, b = String(e.key), x = dr(n, e), S = (e, t) => {
		e && Sn(e, r, 9, t);
	}, C = (e, t) => {
		let n = t[1];
		S(e, t), A(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, w = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = g || c;
			else return;
			t[nr] && t[nr](!0);
			let i = x[b];
			i && _a(e, i) && i.el[nr] && i.el[nr](), S(r, [t]);
		},
		enter(t) {
			if (x[b] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) if (a) r = _ || l, i = v || u, o = y || d;
			else return;
			let s = !1;
			t[rr] = (e) => {
				s || (s = !0, S(e ? o : i, [t]), w.delayedLeave && w.delayedLeave(), t[rr] = void 0);
			};
			let c = t[rr].bind(null, !1);
			r ? C(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[rr] && t[rr](!0), n.isUnmounting) return r();
			S(f, [t]);
			let a = !1;
			t[nr] = (n) => {
				a || (a = !0, r(), S(n ? h : m, [t]), t[nr] = void 0, x[i] === e && delete x[i]);
			};
			let o = t[nr].bind(null, !1);
			x[i] = e, p ? C(p, [t, o]) : o();
		},
		clone(e) {
			let a = fr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return w;
}
function pr(e) {
	if (wr(e)) return e = Sa(e), e.children = null, e;
}
function mr(e) {
	if (!wr(e)) return tr(e.type) && e.children ? lr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && M(n.default)) return n.default();
	}
}
function hr(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, hr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function gr(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === K ? (o.patchFlag & 128 && i++, r = r.concat(gr(o.children, t, s))) : (t || o.type !== sa) && r.push(s == null ? o : Sa(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return M(e) ? /* @__PURE__ */ D({ name: e.name }, t, { setup: e }) : e;
}
function vr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function yr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var br = /* @__PURE__ */ new WeakMap();
function xr(e, t, n, r, i = !1) {
	if (A(e)) {
		e.forEach((e, a) => xr(e, t && (A(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Cr(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && xr(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Ya(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === x ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ H(d), p = d === x ? w : (e) => yr(u, e) ? !1 : k(f, e), m = (e, t) => !(t && yr(u, t));
	if (l != null && l !== c) {
		if (Sr(t), N(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ U(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (M(c)) {
		et();
		try {
			xn(c, s, 12, [o, u]);
		} finally {
			tt();
		}
	} else {
		let t = N(c), r = /* @__PURE__ */ U(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) A(n) && O(n, a);
					else if (A(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), br.delete(e);
				};
				t.id = -1, br.set(e, t), qi(t, n);
			} else Sr(e), s();
		}
	}
}
function Sr(e) {
	let t = br.get(e);
	t && (t.flags |= 8, br.delete(e));
}
be().requestIdleCallback, be().cancelIdleCallback;
var Cr = (e) => !!e.type.__asyncLoader, wr = (e) => e.type.__isKeepAlive;
function Tr(e, t) {
	Dr(e, "a", t);
}
function Er(e, t) {
	Dr(e, "da", t);
}
function Dr(e, t, n = Na) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (kr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) wr(e.parent.vnode) && Or(r, t, n, e), e = e.parent;
	}
}
function Or(e, t, n, r) {
	let i = kr(t, e, r, !0);
	Ir(() => {
		O(r[t], i);
	}, n);
}
function kr(e, t, n = Na, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			et();
			let i = La(n), a = Sn(t, n, e, r);
			return i(), tt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Ar = (e) => (t, n = Na) => {
	(!Ba || e === "sp") && kr(e, (...e) => t(...e), n);
}, jr = Ar("bm"), Mr = Ar("m"), Nr = Ar("bu"), Pr = Ar("u"), Fr = Ar("bum"), Ir = Ar("um"), Lr = Ar("sp"), Rr = Ar("rtg"), zr = Ar("rtc");
function Br(e, t = Na) {
	kr("ec", e, t);
}
var Vr = "components", Hr = /* @__PURE__ */ Symbol.for("v-ndc");
function Ur(e) {
	return N(e) ? Wr(Vr, e, !1) || e : e || Hr;
}
function Wr(e, t, n = !0, r = !1) {
	let i = Vn || Na;
	if (i) {
		let n = i.type;
		if (e === Vr) {
			let e = Xa(n, !1);
			if (e && (e === t || e === R(t) || e === fe(R(t)))) return n;
		}
		let a = Gr(i[e] || n[e], t) || Gr(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function Gr(e, t) {
	return e && (e[t] || e[R(t)] || e[fe(R(t))]);
}
function Kr(e, t, n, r) {
	let i, a = n && n[r], o = A(e);
	if (o || N(e)) {
		let n = o && /* @__PURE__ */ Xt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Qt(e), s = /* @__PURE__ */ Zt(e), e = mt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? nn(tn(e[n])) : tn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (F(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var qr = (e) => e ? za(e) ? Ya(e) : qr(e.parent) : null, Jr = /* @__PURE__ */ D(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => qr(e.parent),
	$root: (e) => qr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => ri(e),
	$forceUpdate: (e) => e.f ||= () => {
		Pn(e.update);
	},
	$nextTick: (e) => e.n ||= Mn.bind(e.proxy),
	$watch: (e) => Qn.bind(e)
}), Yr = (e, t) => e !== x && !e.__isScriptSetup && k(e, t), Xr = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Yr(r, t)) return o[t] = 1, r[t];
			else if (i !== x && k(i, t)) return o[t] = 2, i[t];
			else if (k(a, t)) return o[t] = 3, a[t];
			else if (n !== x && k(n, t)) return o[t] = 4, n[t];
			else Qr && (o[t] = 0);
		}
		let l = Jr[t], u, d;
		if (l) return t === "$attrs" && V(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== x && k(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, k(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Yr(i, t) ? (i[t] = n, !0) : r !== x && k(r, t) ? (r[t] = n, !0) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== x && s[0] !== "$" && k(e, s) || Yr(t, s) || k(a, s) || k(r, s) || k(Jr, s) || k(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? k(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Zr(e) {
	return A(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Qr = !0;
function $r(e) {
	let t = ri(e), n = e.proxy, r = e.ctx;
	Qr = !1, t.beforeCreate && ti(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: x, renderTracked: S, renderTriggered: w, errorCaptured: T, serverPrefetch: E, expose: D, inheritAttrs: O, components: ee, directives: k, filters: te } = t;
	if (l && ei(l, r, null), o) for (let e in o) {
		let t = o[e];
		M(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		F(t) && (e.data = /* @__PURE__ */ Kt(t));
	}
	if (Qr = !0, a) for (let e in a) {
		let t = a[e], i = Qa({
			get: M(t) ? t.bind(n, n) : M(t.get) ? t.get.bind(n, n) : C,
			set: !M(t) && M(t.set) ? t.set.bind(n) : C
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) ni(s[e], r, n, e);
	if (c) {
		let e = M(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			Kn(t, e[t]);
		});
	}
	u && ti(u, e, "c");
	function j(e, t) {
		A(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (j(jr, d), j(Mr, f), j(Nr, p), j(Pr, m), j(Tr, h), j(Er, g), j(Br, T), j(zr, S), j(Rr, w), j(Fr, v), j(Ir, b), j(Lr, E), A(D)) if (D.length) {
		let t = e.exposed ||= {};
		D.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	x && e.render === C && (e.render = x), O != null && (e.inheritAttrs = O), ee && (e.components = ee), k && (e.directives = k), E && vr(e);
}
function ei(e, t, n = C) {
	A(e) && (e = ci(e));
	for (let n in e) {
		let r = e[n], i;
		i = F(r) ? "default" in r ? qn(r.from || n, r.default, !0) : qn(r.from || n) : qn(r), /* @__PURE__ */ U(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function ti(e, t, n) {
	Sn(A(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ni(e, t, n, r) {
	let i = r.includes(".") ? $n(n, r) : () => n[r];
	if (N(e)) {
		let n = t[e];
		M(n) && Xn(i, n);
	} else if (M(e)) Xn(i, e.bind(n));
	else if (F(e)) if (A(e)) e.forEach((e) => ni(e, t, n, r));
	else {
		let r = M(e.handler) ? e.handler.bind(n) : t[e.handler];
		M(r) && Xn(i, r, e);
	}
}
function ri(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => ii(c, e, o, !0)), ii(c, t, o)), F(t) && a.set(t, c), c;
}
function ii(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && ii(e, a, n, !0), i && i.forEach((t) => ii(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = ai[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var ai = {
	data: oi,
	props: di,
	emits: di,
	methods: ui,
	computed: ui,
	beforeCreate: li,
	created: li,
	beforeMount: li,
	mounted: li,
	beforeUpdate: li,
	updated: li,
	beforeDestroy: li,
	beforeUnmount: li,
	destroyed: li,
	unmounted: li,
	activated: li,
	deactivated: li,
	errorCaptured: li,
	serverPrefetch: li,
	components: ui,
	directives: ui,
	watch: fi,
	provide: oi,
	inject: si
};
function oi(e, t) {
	return t ? e ? function() {
		return D(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
	} : t : e;
}
function si(e, t) {
	return ui(ci(e), ci(t));
}
function ci(e) {
	if (A(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function li(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function ui(e, t) {
	return e ? D(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function di(e, t) {
	return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : D(/* @__PURE__ */ Object.create(null), Zr(e), Zr(t ?? {})) : t;
}
function fi(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = D(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = li(e[r], t[r]);
	return n;
}
function pi() {
	return {
		app: null,
		config: {
			isNativeTag: w,
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
var mi = 0;
function hi(e, t) {
	return function(n, r = null) {
		M(n) || (n = D({}, n)), r != null && !F(r) && (r = null);
		let i = pi(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: mi++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: eo,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && M(e.install) ? (a.add(e), e.install(c, ...t)) : M(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || X(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ya(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Sn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = gi;
				gi = c;
				try {
					return e();
				} finally {
					gi = t;
				}
			}
		};
		return c;
	};
}
var gi = null, _i = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${R(t)}Modifiers`] || e[`${de(t)}Modifiers`];
function vi(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || x, i = n, a = t.startsWith("update:"), o = a && _i(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => N(e) ? e.trim() : e)), o.number && (i = n.map(_e)));
	let s, c = r[s = pe(t)] || r[s = pe(R(t))];
	!c && a && (c = r[s = pe(de(t))]), c && Sn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Sn(l, e, 6, i);
	}
}
var yi = /* @__PURE__ */ new WeakMap();
function bi(e, t, n = !1) {
	let r = n ? yi : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!M(e)) {
		let r = (e) => {
			let n = bi(e, t, !0);
			n && (s = !0, D(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (F(e) && r.set(e, null), null) : (A(a) ? a.forEach((e) => o[e] = null) : D(o, a), F(e) && r.set(e, o), o);
}
function xi(e, t) {
	return !e || !T(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, de(t)) || k(e, t));
}
function Si(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Un(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = Ta(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = Ta(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : Ci(s);
		}
	} catch (t) {
		la.length = 0, Cn(t, e, 1), _ = X(sa);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(E) && (v = wi(v, a)), y = Sa(y, v, !1, !0));
	}
	return n.dirs && (y = Sa(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && hr(y, n.transition), _ = y, Un(g), _;
}
var Ci = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || T(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, wi = (e, t) => {
	let n = {};
	for (let r in e) (!E(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Ti(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Ei(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Di(o, r, n) && !xi(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Ei(r, o, l) : !0 : !!o;
	return !1;
}
function Ei(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (Di(t, e, a) && !xi(n, a)) return !0;
	}
	return !1;
}
function Di(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && F(r) && F(i) ? !je(r, i) : r !== i;
}
function Oi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var ki = {}, Ai = () => Object.create(ki), ji = (e) => Object.getPrototypeOf(e) === ki;
function Mi(e, t, n, r = !1) {
	let i = {}, a = Ai();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Pi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ qt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Ni(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ H(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (xi(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (k(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = R(o);
					i[t] = Fi(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Pi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !k(t, a) && ((r = de(a)) === a || !k(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Fi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !k(t, e)) && (delete a[e], l = !0);
	}
	l && dt(e.attrs, "set", "");
}
function Pi(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (ce(c)) continue;
		let l = t[c], u;
		i && k(i, u = R(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : xi(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ H(n), r = s || x;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Fi(i, t, s, r[s], e, !k(r, s));
		}
	}
	return o;
}
function Fi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = k(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && M(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = La(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === de(n)) && (r = !0));
	}
	return r;
}
var Ii = /* @__PURE__ */ new WeakMap();
function Li(e, t, n = !1) {
	let r = n ? Ii : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!M(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Li(e, t, !0);
			D(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return F(e) && r.set(e, S), S;
	if (A(a)) for (let e = 0; e < a.length; e++) {
		let t = R(a[e]);
		Ri(t) && (o[t] = x);
	}
	else if (a) for (let e in a) {
		let t = R(e);
		if (Ri(t)) {
			let n = a[e], r = o[t] = A(n) || M(n) ? { type: n } : D({}, n), i = r.type, c = !1, l = !0;
			if (A(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = M(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = M(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || k(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return F(e) && r.set(e, l), l;
}
function Ri(e) {
	return e[0] !== "$" && !ce(e);
}
var zi = (e) => e === "_" || e === "_ctx" || e === "$stable", Bi = (e) => A(e) ? e.map(Ta) : [Ta(e)], Vi = (e, t, n) => {
	if (t._n) return t;
	let r = Wn((...e) => Bi(t(...e)), n);
	return r._c = !1, r;
}, Hi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (zi(n)) continue;
		let i = e[n];
		if (M(i)) t[n] = Vi(n, i, r);
		else if (i != null) {
			let e = Bi(i);
			t[n] = () => e;
		}
	}
}, Ui = (e, t) => {
	let n = Bi(t);
	e.slots.default = () => n;
}, Wi = (e, t, n) => {
	for (let r in t) (n || !zi(r)) && (e[r] = t[r]);
}, Gi = (e, t, n) => {
	let r = e.slots = Ai();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Wi(r, t, n), n && ge(r, "_", e, !0)) : Hi(t, r);
	} else t && Ui(e, t);
}, Ki = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = x;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Wi(i, t, n) : (a = !t.$stable, Hi(t, i)), o = t;
	} else t && (Ui(e, t), o = { default: 1 });
	if (a) for (let e in i) !zi(e) && o[e] == null && delete i[e];
}, qi = aa;
function Ji(e) {
	return Yi(e);
}
function Yi(e, t) {
	let n = be();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = C, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !_a(e, t) && (r = le(e), I(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case oa:
				g(e, t, n, r);
				break;
			case sa:
				_(e, t, n, r);
				break;
			case ca:
				e ?? v(t, n, r, o);
				break;
			case K:
				A(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? te(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, de);
		}
		u != null && i ? xr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && xr(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, _ = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, v = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, y = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, b = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), O(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && D(e.children, f, null, i, s, Xi(e, c), l, d), _ && Gn(e, null, i, "created"), E(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !ce(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && ka(p, i, e);
		}
		_ && Gn(e, null, i, "beforeMount");
		let v = Qi(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && qi(() => {
			try {
				p && ka(p, i, e), v && g.enter(f), _ && Gn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, E = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || ia(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? Ea(e[l]) : Ta(e[l]), t, n, r, i, a, o, s);
	}, O = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || x, m = t.props || x, h;
		if (n && Zi(n, !1), (h = m.onVnodeBeforeUpdate) && ka(h, n, t, e), f && Gn(t, e, n, "beforeUpdate"), n && Zi(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? ee(e.dynamicChildren, d, c, n, r, Xi(t, i), o) : s || P(e, t, c, null, n, r, Xi(t, i), o, !1), l > 0) {
			if (l & 16) k(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && k(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && qi(() => {
			h && ka(h, n, t, e), f && Gn(t, e, n, "updated");
		}, r);
	}, ee = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === K || !_a(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, k = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== x) for (let o in t) !ce(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (ce(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, A = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ee(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && $i(e, t, !0)) : P(e, t, n, f, a, o, c, l, u);
	}, te = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : j(t, n, r, i, a, o, c) : ne(e, t, c);
	}, j = (e, t, n, r, i, a, o) => {
		let s = e.component = Ma(e, r, i);
		if (wr(e) && (s.ctx.renderer = de), Va(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, M, o), !e.el) {
				let r = s.subTree = X(sa);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else M(s, e, t, n, i, a, o);
	}, ne = (e, t, n) => {
		let r = t.component = e.component;
		if (Ti(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			N(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, M = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = ta(e);
					if (n) {
						t && (t.el = c.el, N(e, t, o)), n.asyncDep.then(() => {
							qi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Zi(e, !1), t ? (t.el = c.el, N(e, t, o)) : t = c, n && he(n), (f = t.props && t.props.onVnodeBeforeUpdate) && ka(f, s, t, c), Zi(e, !0);
				let p = Si(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), le(m), e, i, a), t.el = p.el, u === null && Oi(e, p.el), r && qi(r, i), (f = t.props && t.props.onVnodeUpdated) && qi(() => ka(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Cr(t);
				if (Zi(e, !1), l && he(l), !m && (o = c && c.onVnodeBeforeMount) && ka(o, d, t), Zi(e, !0), s && pe) {
					let t = () => {
						e.subTree = Si(e), pe(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Si(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && qi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					qi(() => ka(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Cr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && qi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ze(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Pn(u), Zi(e, !0), l();
	}, N = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Ni(e, t.props, r, n), Ki(e, t.children, n), et(), Ln(e), tt();
	}, P = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				re(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				F(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && L(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? re(l, f, n, r, i, a, o, s, c) : L(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && D(f, n, r, i, a, o, s, c));
	}, F = (e, t, n, r, i, a, o, s, c) => {
		e ||= S, t ||= S;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? Ea(t[f]) : Ta(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? L(e, i, a, !0, !1, d) : D(t, n, r, i, a, o, s, c, d);
	}, re = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? Ea(t[l]) : Ta(t[l]);
			if (_a(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? Ea(t[f]) : Ta(t[f]);
			if (_a(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? Ea(t[l]) : Ta(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) I(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? Ea(t[l]) : Ta(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, y = f - m + 1, b = !1, x = 0, C = Array(y);
			for (l = 0; l < y; l++) C[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					I(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (C[_ - m] === 0 && _a(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? I(r, i, a, !0) : (C[u - m] = l + 1, u >= x ? x = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let w = b ? ea(C) : S;
			for (_ = w.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || ra(f) : r;
				C[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== w[_] ? ie(d, n, p, 2) : _--);
			}
		}
	}, ie = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			ie(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, de);
			return;
		}
		if (c === K) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) ie(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === ca) {
			y(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[nr] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), qi(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[nr];
				s._isLeaving && s[nr](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, I = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (et(), xr(s, null, n, e, !0), tt()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Cr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ka(_, t, e), u & 6) se(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Gn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, de, r) : l && !l.hasOnce && (a !== K || d > 0 && d & 64) ? L(l, t, n, !1, !0) : (a === K && d & 384 || !i && u & 16) && L(c, t, n), r && ae(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && qi(() => {
			_ && ka(_, t, e), h && Gn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ae = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === K) {
			oe(n, r);
			return;
		}
		if (t === ca) {
			b(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, oe = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, se = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		na(c), na(l), r && he(r), i.stop(), a && (a.flags |= 8, I(o, e, t, n)), s && qi(s, t), qi(() => {
			e.isUnmounted = !0;
		}, t);
	}, L = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) I(e[o], t, n, r, i);
	}, le = (e) => {
		if (e.shapeFlag & 6) return le(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[er];
		return n ? f(n) : t;
	}, R = !1, ue = (e, t, n) => {
		let r;
		e == null ? t._vnode && (I(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, R ||= (R = !0, Ln(r), Rn(), !1);
	}, de = {
		p: h,
		um: I,
		m: ie,
		r: ae,
		mt: j,
		mc: D,
		pc: P,
		pbc: ee,
		n: le,
		o: e
	}, fe, pe;
	return t && ([fe, pe] = t(de)), {
		render: ue,
		hydrate: fe,
		createApp: hi(ue, fe)
	};
}
function Xi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Zi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Qi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $i(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (A(r) && A(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Ea(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && $i(t, a)), a.type === oa && (a.patchFlag === -1 && (a = i[e] = Ea(a)), a.el = t.el), a.type === sa && !a.el && (a.el = t.el);
	}
}
function ea(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function ta(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : ta(t);
}
function na(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ra(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? ra(t.subTree) : null;
}
var ia = (e) => e.__isSuspense;
function aa(e, t) {
	t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : In(e);
}
var K = /* @__PURE__ */ Symbol.for("v-fgt"), oa = /* @__PURE__ */ Symbol.for("v-txt"), sa = /* @__PURE__ */ Symbol.for("v-cmt"), ca = /* @__PURE__ */ Symbol.for("v-stc"), la = [], ua = null;
function q(e = !1) {
	la.push(ua = e ? null : []);
}
function da() {
	la.pop(), ua = la[la.length - 1] || null;
}
var fa = 1;
function pa(e, t = !1) {
	fa += e, e < 0 && ua && t && (ua.hasOnce = !0);
}
function ma(e) {
	return e.dynamicChildren = fa > 0 ? ua || S : null, da(), fa > 0 && ua && ua.push(e), e;
}
function J(e, t, n, r, i, a) {
	return ma(Y(e, t, n, r, i, a, !0));
}
function ha(e, t, n, r, i) {
	return ma(X(e, t, n, r, i, !0));
}
function ga(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function _a(e, t) {
	return e.type === t.type && e.key === t.key;
}
var va = ({ key: e }) => e ?? null, ya = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : N(e) || /* @__PURE__ */ U(e) || M(e) ? {
	i: Vn,
	r: e,
	k: t,
	f: !!n
} : e);
function Y(e, t = null, n = null, r = 0, i = null, a = e === K ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && va(t),
		ref: t && ya(t),
		scopeId: Hn,
		slotScopeIds: null,
		children: n,
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
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Vn
	};
	return s ? (Da(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= N(n) ? 8 : 16), fa > 0 && !o && ua && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && ua.push(c), c;
}
var X = ba;
function ba(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Hr) && (e = sa), ga(e)) {
		let r = Sa(e, t, !0);
		return n && Da(r, n), fa > 0 && !a && ua && (r.shapeFlag & 6 ? ua[ua.indexOf(e)] = r : ua.push(r)), r.patchFlag = -2, r;
	}
	if (Za(e) && (e = e.__vccOpts), t) {
		t = xa(t);
		let { class: e, style: n } = t;
		e && !N(e) && (t.class = Ee(e)), F(n) && (/* @__PURE__ */ $t(n) && !A(n) && (n = D({}, n)), t.style = xe(n));
	}
	let o = N(e) ? 1 : ia(e) ? 128 : tr(e) ? 64 : F(e) ? 4 : M(e) ? 2 : 0;
	return Y(e, t, n, r, i, o, a, !0);
}
function xa(e) {
	return e ? /* @__PURE__ */ $t(e) || ji(e) ? D({}, e) : e : null;
}
function Sa(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Oa(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && va(l),
		ref: t && t.ref ? n && a ? A(a) ? a.concat(ya(t)) : [a, ya(t)] : ya(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== K ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Sa(e.ssContent),
		ssFallback: e.ssFallback && Sa(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && hr(u, c.clone(u)), u;
}
function Ca(e = " ", t = 0) {
	return X(oa, null, e, t);
}
function wa(e = "", t = !1) {
	return t ? (q(), ha(sa, null, e)) : X(sa, null, e);
}
function Ta(e) {
	return e == null || typeof e == "boolean" ? X(sa) : A(e) ? X(K, null, e.slice()) : ga(e) ? Ea(e) : X(oa, null, String(e));
}
function Ea(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Sa(e);
}
function Da(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (A(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), Da(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ji(t) ? t._ctx = Vn : r === 3 && Vn && (Vn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (M(t)) {
		if (r & 65) {
			Da(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: Vn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Ca(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function Oa(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Ee([t.class, r.class]));
		else if (e === "style") t.style = xe([t.style, r.style]);
		else if (T(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(A(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !E(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ka(e, t, n, r = null) {
	Sn(e, t, 7, [n, r]);
}
var Aa = pi(), ja = 0;
function Ma(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Aa, a = {
		uid: ja++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Ie(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Li(r, i),
		emitsOptions: bi(r, i),
		emit: null,
		emitted: null,
		propsDefaults: x,
		inheritAttrs: r.inheritAttrs,
		ctx: x,
		data: x,
		props: x,
		attrs: x,
		slots: x,
		refs: x,
		setupState: x,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = vi.bind(null, a), e.ce && e.ce(a), a;
}
var Na = null, Pa = () => Na || Vn, Fa, Ia;
{
	let e = be(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Fa = t("__VUE_INSTANCE_SETTERS__", (e) => Na = e), Ia = t("__VUE_SSR_SETTERS__", (e) => Ba = e);
}
var La = (e) => {
	let t = Na;
	return Fa(e), e.scope.on(), () => {
		e.scope.off(), Fa(t);
	};
}, Ra = () => {
	Na && Na.scope.off(), Fa(null);
};
function za(e) {
	return e.vnode.shapeFlag & 4;
}
var Ba = !1;
function Va(e, t = !1, n = !1) {
	t && Ia(t);
	let { props: r, children: i } = e.vnode, a = za(e);
	Mi(e, r, a, t), Gi(e, i, n || t);
	let o = a ? Ha(e, t) : void 0;
	return t && Ia(!1), o;
}
function Ha(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Xr);
	let { setup: r } = n;
	if (r) {
		et();
		let n = e.setupContext = r.length > 1 ? Ja(e) : null, i = La(e), a = xn(r, e, 0, [e.props, n]), o = re(a);
		if (tt(), i(), (o || e.sp) && !Cr(e) && vr(e), o) {
			if (a.then(Ra, Ra), t) return a.then((n) => {
				Ua(e, n, t);
			}).catch((t) => {
				Cn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ua(e, a, t);
	} else Ka(e, t);
}
function Ua(e, t, n) {
	M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : F(t) && (e.setupState = cn(t)), Ka(e, n);
}
var Wa, Ga;
function Ka(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Wa && !r.render) {
			let t = r.template || ri(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Wa(t, D(D({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || C, Ga && Ga(e);
	}
	{
		let t = La(e);
		et();
		try {
			$r(e);
		} finally {
			tt(), t();
		}
	}
}
var qa = { get(e, t) {
	return V(e, "get", ""), e[t];
} };
function Ja(e) {
	return {
		attrs: new Proxy(e.attrs, qa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ya(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(cn(en(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Jr) return Jr[n](e);
		},
		has(e, t) {
			return t in e || t in Jr;
		}
	}) : e.proxy;
}
function Xa(e, t = !0) {
	return M(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Za(e) {
	return M(e) && "__vccOpts" in e;
}
var Qa = (e, t) => /* @__PURE__ */ mn(e, t, Ba);
function $a(e, t, n) {
	try {
		pa(-1);
		let r = arguments.length;
		return r === 2 ? F(t) && !A(t) ? ga(t) ? X(e, null, [t]) : X(e, t) : X(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ga(n) && (n = [n]), X(e, t, n));
	} finally {
		pa(1);
	}
}
var eo = "3.5.39", to = void 0, no = typeof window < "u" && window.trustedTypes;
if (no) try {
	to = /* @__PURE__ */ no.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var ro = to ? (e) => to.createHTML(e) : (e) => e, io = "http://www.w3.org/2000/svg", ao = "http://www.w3.org/1998/Math/MathML", oo = typeof document < "u" ? document : null, so = oo && /* @__PURE__ */ oo.createElement("template"), co = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? oo.createElementNS(io, e) : t === "mathml" ? oo.createElementNS(ao, e) : n ? oo.createElement(e, { is: n }) : oo.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => oo.createTextNode(e),
	createComment: (e) => oo.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => oo.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			so.innerHTML = ro(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = so.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, lo = "transition", uo = "animation", fo = /* @__PURE__ */ Symbol("_vtc"), po = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, mo = /* @__PURE__ */ D({}, or, po), ho = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = mo, e))((e, { slots: t }) => $a(ur, vo(e), t)), go = (e, t = []) => {
	A(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, _o = (e) => e ? A(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function vo(e) {
	let t = {};
	for (let n in e) n in po || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: f = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, m = yo(i), h = m && m[0], g = m && m[1], { onBeforeEnter: _, onEnter: v, onEnterCancelled: y, onLeave: b, onLeaveCancelled: x, onBeforeAppear: S = _, onAppear: C = v, onAppearCancelled: w = y } = t, T = (e, t, n, r) => {
		e._enterCancelled = r, So(e, t ? u : s), So(e, t ? l : o), n && n();
	}, E = (e, t) => {
		e._isLeaving = !1, So(e, d), So(e, p), So(e, f), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? C : v, o = () => T(t, e, n);
		go(i, [t, o]), Co(() => {
			So(t, e ? c : a), xo(t, e ? u : s), _o(i) || To(t, r, h, o);
		});
	};
	return D(t, {
		onBeforeEnter(e) {
			go(_, [e]), xo(e, a), xo(e, o);
		},
		onBeforeAppear(e) {
			go(S, [e]), xo(e, c), xo(e, l);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => E(e, t);
			xo(e, d), e._enterCancelled ? (xo(e, f), ko(e)) : (ko(e), xo(e, f)), Co(() => {
				e._isLeaving && (So(e, d), xo(e, p), _o(b) || To(e, r, g, n));
			}), go(b, [e, n]);
		},
		onEnterCancelled(e) {
			T(e, !1, void 0, !0), go(y, [e]);
		},
		onAppearCancelled(e) {
			T(e, !0, void 0, !0), go(w, [e]);
		},
		onLeaveCancelled(e) {
			E(e), go(x, [e]);
		}
	});
}
function yo(e) {
	if (e == null) return null;
	if (F(e)) return [bo(e.enter), bo(e.leave)];
	{
		let t = bo(e);
		return [t, t];
	}
}
function bo(e) {
	return ve(e);
}
function xo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[fo] || (e[fo] = /* @__PURE__ */ new Set())).add(t);
}
function So(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[fo];
	n && (n.delete(t), n.size || (e[fo] = void 0));
}
function Co(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var wo = 0;
function To(e, t, n, r) {
	let i = e._endId = ++wo, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Eo(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Eo(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${lo}Delay`), a = r(`${lo}Duration`), o = Do(i, a), s = r(`${uo}Delay`), c = r(`${uo}Duration`), l = Do(s, c), u = null, d = 0, f = 0;
	t === lo ? o > 0 && (u = lo, d = o, f = a.length) : t === uo ? l > 0 && (u = uo, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? lo : uo : null, f = u ? u === lo ? a.length : c.length : 0);
	let p = u === lo && /\b(?:transform|all)(?:,|$)/.test(r(`${lo}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Do(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Oo(t) + Oo(e[n])));
}
function Oo(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ko(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Ao(e, t, n) {
	let r = e[fo];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var jo = /* @__PURE__ */ Symbol("_vod"), Mo = /* @__PURE__ */ Symbol("_vsh"), No = /* @__PURE__ */ Symbol(""), Po = /(?:^|;)\s*display\s*:/;
function Fo(e, t, n) {
	let r = e.style, i = N(n), a = !1;
	if (n && !i) {
		if (t) if (N(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Lo(r, t, "");
		}
		else for (let e in t) n[e] ?? Lo(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Lo(r, i, "") : Vo(e, i, !N(t) && t ? t[i] : void 0, o) || Lo(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[No];
			e && (n += ";" + e), r.cssText = n, a = Po.test(n);
		}
	} else t && e.removeAttribute("style");
	jo in e && (e[jo] = a ? r.display : "", e[Mo] && (r.display = "none"));
}
var Io = /\s*!important$/;
function Lo(e, t, n) {
	if (A(n)) n.forEach((n) => Lo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = Bo(e, t);
		Io.test(n) ? e.setProperty(de(r), n.replace(Io, ""), "important") : e[r] = n;
	}
}
var Ro = [
	"Webkit",
	"Moz",
	"ms"
], zo = {};
function Bo(e, t) {
	let n = zo[t];
	if (n) return n;
	let r = R(t);
	if (r !== "filter" && r in e) return zo[t] = r;
	r = fe(r);
	for (let n = 0; n < Ro.length; n++) {
		let i = Ro[n] + r;
		if (i in e) return zo[t] = i;
	}
	return t;
}
function Vo(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && N(r) && n === r;
}
var Ho = "http://www.w3.org/1999/xlink";
function Uo(e, t, n, r, i, a = Oe(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ho, t.slice(6, t.length)) : e.setAttributeNS(Ho, t, n) : n == null || a && !ke(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : P(n) ? String(n) : n);
}
function Wo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? ro(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ke(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Go(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Ko(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var qo = /* @__PURE__ */ Symbol("_vei");
function Jo(e, t, n, r, i = null) {
	let a = e[qo] || (e[qo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Zo(t);
		r ? Go(e, n, a[t] = ts(r, i), s) : o && (Ko(e, n, o, s), a[t] = void 0);
	}
}
var Yo = /(Once|Passive|Capture)$/, Xo = /^on:?(?:Once|Passive|Capture)$/;
function Zo(e) {
	let t, n;
	for (; (n = e.match(Yo)) && !Xo.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : de(e.slice(2)), t];
}
var Qo = 0, $o = /* @__PURE__ */ Promise.resolve(), es = () => Qo ||= ($o.then(() => Qo = 0), Date.now());
function ts(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (A(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Sn(e, t, 5, a);
			}
		} else Sn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = es(), n;
}
var ns = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, rs = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Ao(e, r, o) : t === "style" ? Fo(e, n, r) : T(t) ? E(t) || Jo(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : is(e, t, r, o)) ? (Wo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Uo(e, t, r, o, a, t !== "value")) : e._isVueCE && (as(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !N(r))) ? Wo(e, R(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Uo(e, t, r, o));
};
function is(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ns(t) && M(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ns(t) && N(n) ? !1 : t in e;
}
function as(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = R(t);
	return Array.isArray(n) ? n.some((e) => R(e) === r) : Object.keys(n).some((e) => R(e) === r);
}
var os = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], ss = {
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
	exact: (e, t) => os.some((n) => e[`${n}Key`] && !t.includes(n))
}, cs = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = ss[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, ls = /* @__PURE__ */ D({ patchProp: rs }, co), us;
function ds() {
	return us ||= Ji(ls);
}
var fs = ((...e) => {
	let t = ds().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = ms(e);
		if (!r) return;
		let i = t._component;
		!M(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, ps(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function ps(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ms(e) {
	return N(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/.pnpm/@lucide+vue@1.22.0_vue@3.5.39_typescript@5.9.3_/node_modules/@lucide/vue/dist/esm/shared/src/utils/isEmptyString.mjs
var hs = (e) => e === "", gs = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), _s = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), vs = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), ys = (e) => {
	let t = vs(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, bs = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, xs = /* @__PURE__ */ Symbol("lucide-icons");
function Ss() {
	return qn(xs, {});
}
//#endregion
//#region node_modules/.pnpm/@lucide+vue@1.22.0_vue@3.5.39_typescript@5.9.3_/node_modules/@lucide/vue/dist/esm/Icon.mjs
var Cs = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o, color: s, ...c }, { slots: l }) => {
	let { size: u, color: d, strokeWidth: f = 2, absoluteStrokeWidth: p = !1, class: m = "" } = Ss(), h = Qa(() => {
		let e = hs(n) || hs(r) || n === !0 || r === !0 || p === !0, t = i || a || f || bs["stroke-width"];
		return e ? Number(t) * 24 / Number(o ?? u ?? bs.width) : t;
	});
	return $a("svg", {
		...bs,
		...c,
		width: o ?? u ?? bs.width,
		height: o ?? u ?? bs.height,
		stroke: s ?? d ?? bs.stroke,
		"stroke-width": h.value,
		class: gs("lucide", m, ...e ? [`lucide-${_s(ys(e))}-icon`, `lucide-${_s(e)}`] : ["lucide-icon"])
	}, [...t.map((e) => $a(...e)), ...l.default ? [l.default()] : []]);
}, Z = (e, t) => (n, { slots: r, attrs: i }) => $a(Cs, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r.default ? { default: r.default } : void 0), ws = Z("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]), Ts = Z("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), Es = Z("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Ds = Z("circle-dot", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "1",
	key: "41hilf"
}]]), Os = Z("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), ks = Z("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), As = Z("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), js = Z("hand", [
	["path", {
		d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
		key: "1fvzgz"
	}],
	["path", {
		d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
		key: "1kc0my"
	}],
	["path", {
		d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
		key: "10h0bg"
	}],
	["path", {
		d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
		key: "1s1gnw"
	}]
]), Ms = Z("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]), Ns = Z("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), Ps = Z("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]), Fs = Z("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), Is = Z("map", [
	["path", {
		d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
		key: "169xi5"
	}],
	["path", {
		d: "M15 5.764v15",
		key: "1pn4in"
	}],
	["path", {
		d: "M9 3.236v15",
		key: "1uimfh"
	}]
]), Ls = Z("maximize", [
	["path", {
		d: "M8 3H5a2 2 0 0 0-2 2v3",
		key: "1dcmit"
	}],
	["path", {
		d: "M21 8V5a2 2 0 0 0-2-2h-3",
		key: "1e4gt3"
	}],
	["path", {
		d: "M3 16v3a2 2 0 0 0 2 2h3",
		key: "wsl5sc"
	}],
	["path", {
		d: "M16 21h3a2 2 0 0 0 2-2v-3",
		key: "18trek"
	}]
]), Rs = Z("minimize", [
	["path", {
		d: "M8 3v3a2 2 0 0 1-2 2H3",
		key: "hohbtr"
	}],
	["path", {
		d: "M21 8h-3a2 2 0 0 1-2-2V3",
		key: "5jw1f3"
	}],
	["path", {
		d: "M3 16h3a2 2 0 0 1 2 2v3",
		key: "198tvr"
	}],
	["path", {
		d: "M16 21v-3a2 2 0 0 1 2-2h3",
		key: "ph8mxp"
	}]
]), zs = Z("pipette", [
	["path", {
		d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
		key: "1y3wsu"
	}],
	["path", {
		d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
		key: "110lr1"
	}],
	["path", {
		d: "m2 22 .414-.414",
		key: "jhxm08"
	}]
]), Bs = Z("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), Vs = Z("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]), Hs = [
	"point",
	"circle",
	"rectangle"
], Us = [
	{
		id: "point",
		label: "Point",
		hint: "Click to mark a spot"
	},
	{
		id: "circle",
		label: "Circle",
		hint: "Drag to draw a circle"
	},
	{
		id: "rectangle",
		label: "Rectangle",
		hint: "Drag to draw a box"
	}
], Ws = .005, Gs = .012;
function Ks(e) {
	if (!e) return null;
	if (typeof e == "string") try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e;
}
function qs(e, t) {
	let n = Ks(t);
	if (!n) return null;
	if (e === "point") {
		let e = n.position ?? n.center;
		if (!e) return null;
		let t = Array.isArray(e) ? e : [e.x, e.y];
		return { position: [Number(t[0]), Number(t[1])] };
	}
	if (e === "circle") {
		if (!n.center) return null;
		let e = Array.isArray(n.center) ? n.center : [n.center.x, n.center.y];
		return {
			center: [Number(e[0]), Number(e[1])],
			radius: Number(n.radius) || 0
		};
	}
	if (e === "rectangle") {
		if (n.x1 != null && n.y1 != null && n.x2 != null && n.y2 != null) return {
			x1: Number(n.x1),
			y1: Number(n.y1),
			x2: Number(n.x2),
			y2: Number(n.y2)
		};
		if (n.origin && n.size) {
			let e = Array.isArray(n.origin) ? n.origin : [n.origin.x, n.origin.y], t = Array.isArray(n.size) ? n.size : [n.size.x, n.size.y];
			return {
				x1: Number(e[0]),
				y1: Number(e[1]),
				x2: Number(e[0]) + Number(t[0]),
				y2: Number(e[1]) + Number(t[1])
			};
		}
		return null;
	}
	return null;
}
function Js(e) {
	let t = Hs.includes(e.type) ? e.type : "circle", n = qs(t, e.geometry);
	return n ? {
		...e,
		type: t,
		geometry: n
	} : null;
}
function Ys(e) {
	return Array.isArray(e) ? e.map(Js).filter((e) => e !== null) : [];
}
function Xs(e, t) {
	if (!t) return !1;
	if (e === "point") return !0;
	if (e === "circle") return (Number(t.radius) || 0) >= Ws;
	if (e === "rectangle") {
		let e = Math.abs(Number(t.x2) - Number(t.x1)), n = Math.abs(Number(t.y2) - Number(t.y1));
		return e >= .005 && n >= .005;
	}
	return !1;
}
function Zs(e, t) {
	return !e || !t ? !1 : Math.hypot(t.x - e.x, t.y - e.y) < Gs;
}
//#endregion
//#region src/lib/annotationColors.ts
var Qs = [
	"#f59e0b",
	"#ef4444",
	"#22c55e",
	"#3b82f6",
	"#a855f7",
	"#ec4899",
	"#f97316",
	"#14b8a6"
], $s = "#f59e0b", ec = "annotationColor";
function tc() {
	if (typeof localStorage > "u") return $s;
	let e = localStorage.getItem(ec);
	return e && Qs.includes(e) ? e : $s;
}
function nc(e) {
	typeof localStorage > "u" || Qs.includes(e) && localStorage.setItem(ec, e);
}
//#endregion
//#region src/components/ViewerSidebar.vue?vue&type=script&setup=true&lang.ts
var rc = {
	key: 0,
	class: "relative mb-2 flex flex-col items-center"
}, ic = { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, ac = { class: "text-white/60" }, oc = ["onClick"], sc = { class: "font-semibold block leading-tight" }, cc = { class: "text-[10px] text-slate-500 leading-snug" }, lc = { class: "flex flex-wrap gap-1.5 px-3 pb-2" }, uc = ["title", "onClick"], dc = ["onClick"], fc = { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, pc = { class: "text-white font-bold mb-0.5" }, mc = { class: "text-white/60" }, hc = {
	key: 1,
	class: "group relative mt-4 flex flex-col items-center w-full px-2"
}, gc = ["value"], _c = { class: "mt-auto flex flex-col items-center w-full" }, vc = { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, yc = { class: "text-white font-bold mb-0.5" }, bc = /* @__PURE__ */ _r({
	__name: "ViewerSidebar",
	props: {
		currentMode: {
			type: String,
			required: !0
		},
		renderMode: {
			type: Number,
			required: !0
		},
		specularExponent: {
			type: Number,
			required: !0
		},
		annotationEnabled: {
			type: Boolean,
			default: !1
		},
		annotationShape: {
			type: String,
			required: !0
		},
		annotationColor: {
			type: String,
			required: !0
		},
		shapeMenuOpen: {
			type: Boolean,
			default: !1
		},
		activeShapeHint: {
			type: String,
			default: ""
		},
		rtiType: {
			type: Number,
			default: null
		},
		isFullscreen: {
			type: Boolean,
			default: !1
		},
		infoOpen: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"set-mode",
		"toggle-annotate",
		"select-annotation-shape",
		"select-annotation-color",
		"toggle-white-balance",
		"set-render-mode",
		"update:specularExponent",
		"toggle-fullscreen",
		"export-image",
		"copy-link",
		"toggle-info"
	],
	setup(e, { expose: t, emit: n }) {
		let r = {
			point: Ds,
			circle: Os,
			rectangle: Bs
		}, i = [
			{
				id: 0,
				icon: Ms,
				title: "Default Mode",
				description: "Standard diffuse rendering"
			},
			{
				id: 1,
				icon: Ts,
				title: "Glossy Mode",
				description: "Enhance surface scratches"
			},
			{
				id: 2,
				icon: ws,
				title: "Normals Mode",
				description: "View structural geometry"
			},
			{
				id: 3,
				icon: Is,
				title: "Slope Heatmap",
				description: "Visualize surface steepness"
			},
			{
				id: 4,
				icon: Vs,
				title: "Dual Light",
				description: "Red & Blue opposing lights"
			}
		], a = {
			id: 5,
			icon: ws,
			title: "Latent Map",
			description: "View raw learned latent map"
		}, o = e, s = n, c = /* @__PURE__ */ W(null);
		t({ sidebarEl: c });
		let l = Qa(() => o.rtiType === 5 ? [...i, a] : i);
		function u(e) {
			let t = e.target;
			s("update:specularExponent", parseFloat(t.value));
		}
		return (t, n) => (q(), J("div", {
			ref_key: "sidebarEl",
			ref: c,
			class: "w-16 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-4 relative z-50 shrink-0 self-stretch"
		}, [
			Y("button", {
				onClick: n[0] ||= (e) => s("set-mode", "pan"),
				class: Ee(["group relative p-3 rounded-xl transition-all mb-2", e.currentMode === "pan" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
			}, [X(G(js), { class: "w-5 h-5" }), n[9] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "Pan & Zoom"), Y("span", { class: "text-white/60" }, "Navigate the image")], -1)], 2),
			Y("button", {
				onClick: n[1] ||= (e) => s("set-mode", "light"),
				class: Ee(["group relative p-3 rounded-xl transition-all", e.currentMode === "light" ? "bg-yellow-500 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
			}, [X(G(Ps), { class: "w-5 h-5" }), n[10] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "Light Direction"), Y("span", { class: "text-white/60" }, "Move the light source")], -1)], 2),
			e.annotationEnabled ? (q(), J("div", rc, [Y("button", {
				type: "button",
				onClick: n[2] ||= (e) => s("toggle-annotate"),
				class: Ee(["group relative p-3 rounded-xl transition-all", e.currentMode === "annotate" ? "bg-amber-500 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
			}, [
				(q(), ha(Ur(r[e.annotationShape]), { class: "w-5 h-5" })),
				Y("span", {
					class: "absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white/90 shadow-sm",
					style: xe({ backgroundColor: e.annotationColor })
				}, null, 4),
				Y("div", ic, [n[11] ||= Y("span", { class: "text-white font-bold mb-0.5" }, "Annotate", -1), Y("span", ac, Ne(e.activeShapeHint), 1)])
			], 2), e.currentMode === "annotate" && e.shapeMenuOpen ? (q(), J("div", {
				key: 0,
				class: "absolute left-full top-0 ml-2 z-[60] w-44 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-md shadow-2xl py-1.5",
				onPointerdown: n[3] ||= cs(() => {}, ["stop"])
			}, [
				n[12] ||= Y("p", { class: "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400" }, "Shape", -1),
				(q(!0), J(K, null, Kr(G(Us), (t) => (q(), J("button", {
					key: t.id,
					type: "button",
					class: Ee(["w-full flex items-start gap-2.5 px-3 py-2 text-left text-xs transition-colors", e.annotationShape === t.id ? "bg-amber-500/20 text-amber-200" : "text-slate-300 hover:bg-white/10"]),
					onClick: (e) => s("select-annotation-shape", t.id)
				}, [(q(), ha(Ur(r[t.id]), { class: "w-4 h-4 shrink-0 mt-0.5" })), Y("span", null, [Y("span", sc, Ne(t.label), 1), Y("span", cc, Ne(t.hint), 1)])], 10, oc))), 128)),
				n[13] ||= Y("p", { class: "px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 border-t border-white/10 mt-1" }, "Color", -1),
				Y("div", lc, [(q(!0), J(K, null, Kr(G(Qs), (t) => (q(), J("button", {
					key: t,
					type: "button",
					class: Ee(["w-6 h-6 rounded-full border-2 transition-transform hover:scale-110", e.annotationColor === t ? "border-white scale-110" : "border-transparent"]),
					style: xe({ backgroundColor: t }),
					title: t,
					onClick: (e) => s("select-annotation-color", t)
				}, null, 14, uc))), 128))])
			], 32)) : wa("", !0)])) : wa("", !0),
			n[21] ||= Y("div", { class: "w-8 h-px bg-slate-700 my-4" }, null, -1),
			Y("button", {
				onClick: n[4] ||= (e) => s("toggle-white-balance"),
				class: Ee(["group relative p-3 rounded-xl transition-all mb-2", e.currentMode === "whitebalance" ? "bg-cyan-500 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
			}, [X(G(zs), { class: "w-5 h-5" }), n[14] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "White Balance"), Y("span", { class: "text-white/60" }, "Click a white or gray patch")], -1)], 2),
			n[22] ||= Y("div", { class: "w-8 h-px bg-slate-700 my-4" }, null, -1),
			(q(!0), J(K, null, Kr(l.value, (t) => (q(), J("button", {
				key: t.id,
				onClick: (e) => s("set-render-mode", t.id),
				class: Ee(["group relative p-3 rounded-xl transition-all mb-2", e.renderMode === t.id ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
			}, [(q(), ha(Ur(t.icon), { class: "w-5 h-5" })), Y("div", fc, [Y("span", pc, Ne(t.title), 1), Y("span", mc, Ne(t.description), 1)])], 10, dc))), 128)),
			e.renderMode === 1 ? (q(), J("div", hc, [Y("input", {
				type: "range",
				min: "2",
				max: "50",
				value: e.specularExponent,
				class: "w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500",
				style: {
					"writing-mode": "bt-lr",
					transform: "rotate(270deg)",
					width: "60px",
					"margin-top": "30px",
					"margin-bottom": "30px"
				},
				onInput: u
			}, null, 40, gc), n[15] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "Specular Intensity"), Y("span", { class: "text-white/60" }, "Adjust surface wetness")], -1)])) : wa("", !0),
			Y("div", _c, [
				n[20] ||= Y("div", { class: "w-8 h-px bg-slate-700 my-4" }, null, -1),
				Y("button", {
					onClick: n[5] ||= (e) => s("toggle-fullscreen"),
					class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
				}, [(q(), ha(Ur(e.isFullscreen ? G(Rs) : G(Ls)), { class: "w-5 h-5" })), Y("div", vc, [Y("span", yc, Ne(e.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"), 1), n[16] ||= Y("span", { class: "text-white/60" }, "Maximize workspace", -1)])]),
				Y("button", {
					onClick: n[6] ||= (e) => s("export-image"),
					class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
				}, [X(G(As), { class: "w-5 h-5" }), n[17] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "Download Render"), Y("span", { class: "text-white/60" }, "Save current view as PNG")], -1)]),
				Y("button", {
					onClick: n[7] ||= (e) => s("copy-link"),
					class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
				}, [X(G(Fs), { class: "w-5 h-5" }), n[18] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "Copy Link"), Y("span", { class: "text-white/60" }, "Share view with exact angles")], -1)]),
				Y("button", {
					onClick: n[8] ||= (e) => s("toggle-info"),
					class: Ee(["group relative p-3 rounded-xl transition-all", e.infoOpen ? "bg-white/20 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [X(G(Ns), { class: "w-5 h-5" }), n[19] ||= Y("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [Y("span", { class: "text-white font-bold mb-0.5" }, "About"), Y("span", { class: "text-white/60" }, "Project credits")], -1)], 2)
			])
		], 512));
	}
}), xc = {
	name: "modernrtiviewer",
	private: !0,
	version: "1.1.0",
	type: "module",
	scripts: {
		dev: "vite & vitepress dev docs --port 5174",
		build: "vue-tsc --noEmit && vite build && vitepress build docs",
		preview: "vite preview",
		typecheck: "vue-tsc --noEmit",
		"docs:dev": "vitepress dev docs --port 5174",
		"docs:build": "vitepress build docs",
		"docs:preview": "vitepress preview docs",
		test: "vitest run",
		"test:watch": "vitest",
		"test:e2e": "playwright test",
		"test:e2e:ui": "playwright test --ui"
	},
	dependencies: {
		"@lucide/vue": "^1.22.0",
		geotiff: "^2.1.3",
		three: "^0.185.0",
		vue: "^3.5.39"
	},
	devDependencies: {
		"@tailwindcss/vite": "^4.3.2",
		"@vitejs/plugin-vue": "^6.0.7",
		"@vue/test-utils": "^2.4.11",
		"happy-dom": "^20.10.6",
		"@playwright/test": "^1.55.0",
		"@types/node": "^24.3.0",
		"@types/three": "^0.185.0",
		tailwindcss: "^4.3.2",
		typescript: "^5.9.2",
		vite: "^8.1.1",
		vitepress: "^1.6.4",
		vitest: "^4.1.9",
		"vue-tsc": "^3.0.6"
	}
}.version, Sc = {
	key: 0,
	class: "absolute inset-0 z-50 flex items-center justify-center p-4"
}, Cc = { class: "relative bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-slate-300" }, wc = { class: "flex items-center space-x-3 mb-6" }, Tc = { class: "px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30" }, Ec = /* @__PURE__ */ _r({
	__name: "ViewerInfoModal",
	props: { open: {
		type: Boolean,
		default: !1
	} },
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (q(), ha(ho, {
			"enter-active-class": "transition duration-200 ease-out",
			"enter-from-class": "opacity-0 scale-95",
			"enter-to-class": "opacity-100 scale-100",
			"leave-active-class": "transition duration-150 ease-in",
			"leave-from-class": "opacity-100 scale-100",
			"leave-to-class": "opacity-0 scale-95"
		}, {
			default: Wn(() => [e.open ? (q(), J("div", Sc, [Y("div", {
				class: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
				onClick: r[0] ||= (e) => n("close")
			}), Y("div", Cc, [
				Y("button", {
					onClick: r[1] ||= (e) => n("close"),
					class: "absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
				}, [...r[2] ||= [Y("svg", {
					class: "w-6 h-6",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor"
				}, [Y("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-width": "2",
					d: "M6 18L18 6M6 6l12 12"
				})], -1)]]),
				Y("div", wc, [r[3] ||= Y("h2", { class: "text-2xl font-bold text-white" }, "About RTI Viewer", -1), Y("span", Tc, "v" + Ne(G(xc)), 1)]),
				r[4] ||= Y("div", { class: "space-y-4 mb-8" }, [Y("div", null, [Y("h3", { class: "text-white font-semibold mb-1" }, "Technology"), Y("p", { class: "text-sm text-slate-400" }, "Powered by Vue 3 and Three.js. This viewer utilizes custom WebGL shaders to reconstruct reflectance fields (PTM/HSH) in real-time directly on the GPU.")]), Y("div", null, [Y("h3", { class: "text-white font-semibold mb-1" }, "Performance"), Y("p", { class: "text-sm text-slate-400" }, "Large RTI datasets are seamlessly loaded using an intelligent Frustum-Culling Quadtree, ensuring only visible tiles are kept in VRAM.")])], -1),
				r[5] ||= Y("div", { class: "pt-6 border-t border-slate-700 text-center" }, [Y("div", { class: "text-sm font-medium tracking-wide" }, [
					Ca(" built with "),
					Y("span", { class: "text-red-500/90 text-[16px] mx-1" }, "❤️"),
					Ca(" by "),
					Y("a", {
						href: "https://github.com/mfindeisen",
						target: "_blank",
						rel: "noopener noreferrer",
						class: "text-blue-400 hover:text-blue-300 hover:underline transition-colors"
					}, "Matthias Findeisen")
				])], -1)
			])])) : wa("", !0)]),
			_: 1
		}));
	}
}), Dc = {
	key: 0,
	class: "absolute inset-0 z-50 flex items-center justify-center p-4"
}, Oc = { class: "relative bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-slate-300" }, kc = { class: "flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-xl p-2" }, Ac = ["value"], jc = /* @__PURE__ */ _r({
	__name: "ViewerShareModal",
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		shareLink: {
			type: String,
			default: ""
		},
		copied: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["close", "copy"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (q(), ha(ho, {
			"enter-active-class": "transition duration-200 ease-out",
			"enter-from-class": "opacity-0 scale-95",
			"enter-to-class": "opacity-100 scale-100",
			"leave-active-class": "transition duration-150 ease-in",
			"leave-from-class": "opacity-100 scale-100",
			"leave-to-class": "opacity-0 scale-95"
		}, {
			default: Wn(() => [e.open ? (q(), J("div", Dc, [Y("div", {
				class: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
				onClick: r[0] ||= (e) => n("close")
			}), Y("div", Oc, [
				Y("button", {
					onClick: r[1] ||= (e) => n("close"),
					class: "absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
				}, [...r[4] ||= [Y("svg", {
					class: "w-6 h-6",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor"
				}, [Y("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-width": "2",
					d: "M6 18L18 6M6 6l12 12"
				})], -1)]]),
				r[5] ||= Y("h2", { class: "text-2xl font-bold text-white mb-2" }, "Share this View", -1),
				r[6] ||= Y("p", { class: "text-sm text-slate-400 mb-6" }, "This link contains the exact camera angle, zoom level, and light direction you are currently viewing.", -1),
				Y("div", kc, [Y("input", {
					type: "text",
					readonly: "",
					value: e.shareLink,
					class: "flex-1 bg-transparent text-white px-3 py-2 outline-none text-sm font-mono selection:bg-blue-500/30",
					onFocus: r[2] ||= (e) => e.target.select()
				}, null, 40, Ac), Y("button", {
					onClick: r[3] ||= (e) => n("copy"),
					class: Ee(["px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2", e.copied ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-600 hover:bg-blue-500 text-white"])
				}, [(q(), ha(Ur(e.copied ? G(Es) : G(ks)), { class: "w-4 h-4" })), Y("span", null, Ne(e.copied ? "Copied" : "Copy"), 1)], 2)])
			])])) : wa("", !0)]),
			_: 1
		}));
	}
}), Mc = { class: "flex items-center justify-between mb-3" }, Nc = { class: "flex flex-col gap-2.5 text-xs text-slate-400" }, Pc = { class: "flex items-center justify-between" }, Fc = { class: "text-slate-300 tabular-nums" }, Ic = [
	"min",
	"max",
	"value",
	"onInput"
], Lc = {
	key: 1,
	class: "absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 text-sm font-medium shadow-lg backdrop-blur-sm pointer-events-none"
}, Rc = /* @__PURE__ */ _r({
	__name: "ViewerWhiteBalancePanel",
	props: {
		currentMode: {
			type: String,
			required: !0
		},
		loading: {
			type: Boolean,
			default: !1
		},
		whiteBalanceActive: {
			type: Boolean,
			default: !1
		},
		colorGain: {
			type: Object,
			required: !0
		},
		gainMin: {
			type: Number,
			required: !0
		},
		gainMax: {
			type: Number,
			required: !0
		},
		pickFeedback: {
			type: String,
			default: ""
		}
	},
	emits: ["update:colorGain", "reset"],
	setup(e, { emit: t }) {
		let n = [
			{
				key: "r",
				label: "Red"
			},
			{
				key: "g",
				label: "Green"
			},
			{
				key: "b",
				label: "Blue"
			}
		], r = e, i = t;
		function a(e, t) {
			let n = t.target, a = parseFloat(n.value);
			i("update:colorGain", {
				...r.colorGain,
				[e]: a
			});
		}
		return (t, r) => (q(), J(K, null, [(e.currentMode === "whitebalance" || e.whiteBalanceActive) && !e.loading ? (q(), J("div", {
			key: 0,
			class: "absolute top-4 right-4 z-40 w-56 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-2xl p-4 pointer-events-auto",
			onPointerdown: r[1] ||= cs(() => {}, ["stop"])
		}, [Y("div", Mc, [r[2] ||= Y("h3", { class: "text-sm font-semibold text-white" }, "White Balance", -1), Y("button", {
			type: "button",
			onClick: r[0] ||= (e) => i("reset"),
			class: "text-[10px] font-medium text-slate-400 hover:text-white transition-colors"
		}, " Reset ")]), Y("div", Nc, [(q(), J(K, null, Kr(n, (t) => Y("label", {
			key: t.key,
			class: "flex flex-col gap-1"
		}, [Y("span", Pc, [Y("span", null, Ne(t.label), 1), Y("span", Fc, Ne(e.colorGain[t.key].toFixed(2)), 1)]), Y("input", {
			type: "range",
			min: e.gainMin,
			max: e.gainMax,
			step: "0.01",
			value: e.colorGain[t.key],
			class: "w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500",
			onInput: (e) => a(t.key, e)
		}, null, 40, Ic)])), 64))])], 32)) : wa("", !0), e.currentMode === "whitebalance" && !e.loading ? (q(), J("div", Lc, Ne(e.pickFeedback || "Click a white or gray patch on the color chart"), 1)) : wa("", !0)], 64));
	}
}), zc = /* @__PURE__ */ _r({
	__name: "LightCompass",
	props: { lightDir: {
		type: Object,
		required: !0
	} },
	setup(e, { expose: t }) {
		let n = /* @__PURE__ */ W(null);
		return t({ compassEl: n }), (t, r) => (q(), J("div", {
			ref_key: "compassEl",
			ref: n,
			class: "absolute bottom-6 left-6 w-24 h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center z-20 shadow-xl overflow-hidden cursor-crosshair touch-none"
		}, [
			r[0] ||= Y("div", { class: "absolute inset-0 rounded-full border-2 border-white/5 m-2 pointer-events-none" }, null, -1),
			r[1] ||= Y("div", { class: "absolute w-full h-px bg-white/10 pointer-events-none" }, null, -1),
			r[2] ||= Y("div", { class: "absolute h-full w-px bg-white/10 pointer-events-none" }, null, -1),
			Y("div", {
				class: "absolute top-1/2 left-1/2 -mt-1.5 -ml-1.5 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-transform duration-75 pointer-events-none",
				style: xe({ transform: `translate(${e.lightDir.x * (40 / .95)}px, ${-e.lightDir.y * (40 / .95)}px)` })
			}, null, 4)
		], 512));
	}
}), Bc = ["viewBox"], Vc = ["onClick"], Hc = [
	"cx",
	"cy",
	"r"
], Uc = [
	"x",
	"y",
	"width",
	"height"
], Wc = [
	"cx",
	"cy",
	"r",
	"stroke",
	"stroke-width",
	"stroke-dasharray"
], Gc = [
	"cx",
	"cy",
	"r",
	"fill",
	"stroke",
	"stroke-width"
], Kc = [
	"x",
	"y",
	"width",
	"height",
	"stroke",
	"stroke-width",
	"stroke-dasharray"
], qc = {
	key: 5,
	class: "pointer-events-none"
}, Jc = [
	"x",
	"y",
	"width",
	"fill"
], Yc = ["x", "y"], Xc = /* @__PURE__ */ _r({
	__name: "AnnotationOverlay",
	props: {
		visible: { type: Boolean },
		interactive: { type: Boolean },
		shapes: {},
		overlaySize: {},
		selectedId: {},
		interactionClass: { type: Function }
	},
	emits: [
		"pointerdown",
		"pointermove",
		"pointerup",
		"shape-click"
	],
	setup(e, { expose: t, emit: n }) {
		let r = n, i = /* @__PURE__ */ W(null);
		return t({ overlayEl: i }), (t, n) => e.visible ? (q(), J("svg", {
			key: 0,
			ref_key: "overlayEl",
			ref: i,
			class: Ee(["absolute inset-0 z-30 touch-none w-full h-full", e.interactive ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"]),
			viewBox: `0 0 ${e.overlaySize.w} ${e.overlaySize.h}`,
			preserveAspectRatio: "none",
			xmlns: "http://www.w3.org/2000/svg",
			onPointerdown: n[0] ||= (e) => r("pointerdown", e),
			onPointermove: n[1] ||= (e) => r("pointermove", e),
			onPointerup: n[2] ||= (e) => r("pointerup", e),
			onPointercancel: n[3] ||= (e) => r("pointerup", e)
		}, [(q(!0), J(K, null, Kr(e.shapes, (t) => (q(), J("g", {
			key: t.key,
			class: Ee(e.interactionClass(t)),
			onClick: cs((e) => r("shape-click", t), ["stop"])
		}, [
			!t.draft && t.annotationId && t.kind !== "rect" ? (q(), J("circle", {
				key: 0,
				cx: t.cx,
				cy: t.cy,
				r: Math.max(t.r, 16),
				fill: "transparent"
			}, null, 8, Hc)) : wa("", !0),
			!t.draft && t.annotationId && t.kind === "rect" ? (q(), J("rect", {
				key: 1,
				x: t.x - 6,
				y: t.y - 6,
				width: t.w + 12,
				height: t.h + 12,
				fill: "transparent"
			}, null, 8, Uc)) : wa("", !0),
			t.kind === "circle" ? (q(), J("circle", {
				key: 2,
				cx: t.cx,
				cy: t.cy,
				r: t.r,
				fill: "none",
				stroke: t.color,
				"stroke-width": e.selectedId === t.annotationId ? 3 : 2,
				"vector-effect": "non-scaling-stroke",
				"stroke-dasharray": t.draft ? "6 4" : void 0,
				class: "pointer-events-none"
			}, null, 8, Wc)) : t.kind === "point" ? (q(), J("circle", {
				key: 3,
				cx: t.cx,
				cy: t.cy,
				r: t.r,
				fill: t.color,
				"fill-opacity": "0.9",
				stroke: t.color,
				"stroke-width": e.selectedId === t.annotationId ? 3 : 2,
				"vector-effect": "non-scaling-stroke",
				class: "pointer-events-none"
			}, null, 8, Gc)) : t.kind === "rect" ? (q(), J("rect", {
				key: 4,
				x: t.x,
				y: t.y,
				width: t.w,
				height: t.h,
				fill: "none",
				stroke: t.color,
				"stroke-width": e.selectedId === t.annotationId ? 3 : 2,
				"vector-effect": "non-scaling-stroke",
				"stroke-dasharray": t.draft ? "6 4" : void 0,
				class: "pointer-events-none"
			}, null, 8, Kc)) : wa("", !0),
			t.label ? (q(), J("g", qc, [Y("rect", {
				x: (t.labelX ?? 0) - 6,
				y: (t.labelY ?? 0) - 16,
				width: (t.labelWidth ?? 0) + 12,
				height: "22",
				rx: "4",
				fill: e.selectedId === t.annotationId ? "rgba(30, 58, 138, 0.95)" : "rgba(15, 23, 42, 0.92)",
				stroke: "rgba(255, 255, 255, 0.15)",
				"stroke-width": "1"
			}, null, 8, Jc), Y("text", {
				x: t.labelX ?? 0,
				y: t.labelY ?? 0,
				fill: "#f8fafc",
				"font-size": "11",
				"font-family": "system-ui, sans-serif",
				"font-weight": "500"
			}, Ne(t.label), 9, Yc)])) : wa("", !0)
		], 10, Vc))), 128))], 42, Bc)) : wa("", !0);
	}
}), Zc = { type: "change" }, Qc = { type: "start" }, $c = { type: "end" }, el = new c(), tl = new a(), nl = Math.cos(70 * m.DEG2RAD), Q = new t(), rl = 2 * Math.PI, $ = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, il = 1e-6, al = class extends p {
	constructor(e, n = null) {
		super(e, n), this.state = $.NONE, this.target = new t(), this.cursor = new t(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: d.ROTATE,
			MIDDLE: d.DOLLY,
			RIGHT: d.PAN
		}, this.touches = {
			ONE: y.ROTATE,
			TWO: y.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new t(), this._lastQuaternion = new f(), this._lastTargetPosition = new t(), this._quat = new f().setFromUnitVectors(e.up, new t(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new _(), this._sphericalDelta = new _(), this._scale = 1, this._panOffset = new t(), this._rotateStart = new v(), this._rotateEnd = new v(), this._rotateDelta = new v(), this._panStart = new v(), this._panEnd = new v(), this._panDelta = new v(), this._dollyStart = new v(), this._dollyEnd = new v(), this._dollyDelta = new v(), this._dollyDirection = new t(), this._mouse = new v(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = sl.bind(this), this._onPointerDown = ol.bind(this), this._onPointerUp = cl.bind(this), this._onContextMenu = hl.bind(this), this._onMouseWheel = dl.bind(this), this._onKeyDown = fl.bind(this), this._onTouchStart = pl.bind(this), this._onTouchMove = ml.bind(this), this._onMouseDown = ll.bind(this), this._onMouseMove = ul.bind(this), this._interceptControlDown = gl.bind(this), this._interceptControlUp = _l.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
	}
	set cursorStyle(e) {
		this._cursorStyle = e, e === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
	}
	get cursorStyle() {
		return this._cursorStyle;
	}
	connect(e) {
		super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
			passive: !0,
			capture: !0
		}), this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(e) {
		e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
	}
	stopListenToKeyEvents() {
		this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
	}
	saveState() {
		this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Zc), this.update(), this.state = $.NONE;
	}
	pan(e, t) {
		this._pan(e, t), this.update();
	}
	dollyIn(e) {
		this._dollyIn(e), this.update();
	}
	dollyOut(e) {
		this._dollyOut(e), this.update();
	}
	rotateLeft(e) {
		this._rotateLeft(e), this.update();
	}
	rotateUp(e) {
		this._rotateUp(e), this.update();
	}
	update(e = null) {
		let n = this.object.position;
		Q.copy(n).sub(this.target), Q.applyQuaternion(this._quat), this._spherical.setFromVector3(Q), this.autoRotate && this.state === $.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let r = this.minAzimuthAngle, i = this.maxAzimuthAngle;
		isFinite(r) && isFinite(i) && (r < -Math.PI ? r += rl : r > Math.PI && (r -= rl), i < -Math.PI ? i += rl : i > Math.PI && (i -= rl), r <= i ? this._spherical.theta = Math.max(r, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (r + i) / 2 ? Math.max(r, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let a = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), a = e != this._spherical.radius;
		}
		if (Q.setFromSpherical(this._spherical), Q.applyQuaternion(this._quatInverse), n.copy(this.target).add(Q), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = Q.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), a = !!n;
			} else if (this.object.isOrthographicCamera) {
				let n = new t(this._mouse.x, this._mouse.y, 0);
				n.unproject(this.object);
				let r = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), a = r !== this.object.zoom;
				let i = new t(this._mouse.x, this._mouse.y, 0);
				i.unproject(this.object), this.object.position.sub(i).add(n), this.object.updateMatrixWorld(), e = Q.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (el.origin.copy(this.object.position), el.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(el.direction)) < nl ? this.object.lookAt(this.target) : (tl.setFromNormalAndCoplanarPoint(this.object.up, this.target), el.intersectPlane(tl, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), a = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, a || this._lastPosition.distanceToSquared(this.object.position) > il || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > il || this._lastTargetPosition.distanceToSquared(this.target) > il ? (this.dispatchEvent(Zc), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? rl / 60 / 60 * this.autoRotateSpeed : rl / 60 * this.autoRotateSpeed * e;
	}
	_getZoomScale(e) {
		let t = Math.abs(e * .01);
		return .95 ** (this.zoomSpeed * t);
	}
	_rotateLeft(e) {
		this._sphericalDelta.theta -= e;
	}
	_rotateUp(e) {
		this._sphericalDelta.phi -= e;
	}
	_panLeft(e, t) {
		Q.setFromMatrixColumn(t, 0), Q.multiplyScalar(-e), this._panOffset.add(Q);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? Q.setFromMatrixColumn(t, 1) : (Q.setFromMatrixColumn(t, 0), Q.crossVectors(this.object.up, Q)), Q.multiplyScalar(e), this._panOffset.add(Q);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			Q.copy(r).sub(this.target);
			let i = Q.length();
			i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * i / n.clientHeight, this.object.matrix), this._panUp(2 * t * i / n.clientHeight, this.object.matrix);
		} else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
	}
	_dollyOut(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_dollyIn(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
	}
	_updateZoomParameters(e, t) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = !0;
		let n = this.domElement.getBoundingClientRect(), r = e - n.left, i = t - n.top, a = n.width, o = n.height;
		this._mouse.x = r / a * 2 - 1, this._mouse.y = -(i / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(e) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, e));
	}
	_handleMouseDownRotate(e) {
		this._rotateStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownDolly(e) {
		this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownPan(e) {
		this._panStart.set(e.clientX, e.clientY);
	}
	_handleMouseMoveRotate(e) {
		this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(rl * this._rotateDelta.x / t.clientHeight), this._rotateUp(rl * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
	}
	_handleMouseMoveDolly(e) {
		this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
	}
	_handleMouseMovePan(e) {
		this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
	}
	_handleMouseWheel(e) {
		this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
	}
	_handleKeyDown(e) {
		let t = !1;
		switch (e.code) {
			case this.keys.UP:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(rl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-rl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(rl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-rl * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
				break;
		}
		t && (e.preventDefault(), this.update());
	}
	_handleTouchStartRotate(e) {
		if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateStart.set(n, r);
		}
	}
	_handleTouchStartPan(e) {
		if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panStart.set(n, r);
		}
	}
	_handleTouchStartDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyStart.set(0, i);
	}
	_handleTouchStartDollyPan(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
	}
	_handleTouchStartDollyRotate(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
	}
	_handleTouchMoveRotate(e) {
		if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateEnd.set(n, r);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(rl * this._rotateDelta.x / t.clientHeight), this._rotateUp(rl * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(e) {
		if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panEnd.set(n, r);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyEnd.set(0, i), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
		let a = (e.pageX + t.x) * .5, o = (e.pageY + t.y) * .5;
		this._updateZoomParameters(a, o);
	}
	_handleTouchMoveDollyPan(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
	}
	_handleTouchMoveDollyRotate(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
	}
	_addPointer(e) {
		this._pointers.push(e.pointerId);
	}
	_removePointer(e) {
		delete this._pointerPositions[e.pointerId];
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
			this._pointers.splice(t, 1);
			return;
		}
	}
	_isTrackingPointer(e) {
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
		return !1;
	}
	_trackPointer(e) {
		let t = this._pointerPositions[e.pointerId];
		t === void 0 && (t = new v(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
	}
	_getSecondPointerPosition(e) {
		let t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[t];
	}
	_customWheelEvent(e) {
		let t = e.deltaMode, n = {
			clientX: e.clientX,
			clientY: e.clientY,
			deltaY: e.deltaY
		};
		switch (t) {
			case 1:
				n.deltaY *= 16;
				break;
			case 2:
				n.deltaY *= 100;
				break;
		}
		return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
	}
};
function ol(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function sl(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function cl(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent($c), this.state = $.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
			break;
		case 1:
			let t = this._pointers[0], n = this._pointerPositions[t];
			this._onTouchStart({
				pointerId: t,
				pageX: n.x,
				pageY: n.y
			});
			break;
	}
}
function ll(e) {
	let t;
	switch (e.button) {
		case 0:
			t = this.mouseButtons.LEFT;
			break;
		case 1:
			t = this.mouseButtons.MIDDLE;
			break;
		case 2:
			t = this.mouseButtons.RIGHT;
			break;
		default: t = -1;
	}
	switch (t) {
		case d.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = $.DOLLY;
			break;
		case d.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = $.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = $.ROTATE;
			}
			break;
		case d.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = $.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = $.PAN;
			}
			break;
		default: this.state = $.NONE;
	}
	this.state !== $.NONE && this.dispatchEvent(Qc);
}
function ul(e) {
	switch (this.state) {
		case $.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case $.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case $.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function dl(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== $.NONE || (e.preventDefault(), this.dispatchEvent(Qc), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent($c));
}
function fl(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function pl(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case y.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = $.TOUCH_ROTATE;
					break;
				case y.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = $.TOUCH_PAN;
					break;
				default: this.state = $.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case y.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = $.TOUCH_DOLLY_PAN;
					break;
				case y.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = $.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = $.NONE;
			}
			break;
		default: this.state = $.NONE;
	}
	this.state !== $.NONE && this.dispatchEvent(Qc);
}
function ml(e) {
	switch (this._trackPointer(e), this.state) {
		case $.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case $.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case $.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case $.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = $.NONE;
	}
}
function hl(e) {
	this.enabled !== !1 && e.preventDefault();
}
function gl(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function _l(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region src/lib/QuadtreeManager.ts
var vl = class {
	imgW;
	imgH;
	tileSize;
	maxSize;
	nLevels;
	imgBox;
	nodes = [];
	constructor(e, t, n) {
		this.imgW = e, this.imgH = t, this.tileSize = n, this.maxSize = 2 ** Math.ceil(Math.log2(Math.max(e, t))), this.nLevels = 1;
		let r = this.maxSize;
		for (; r > n;) this.nLevels++, r /= 2;
		let i = (this.maxSize - e) / 2 / this.maxSize, a = (this.maxSize - t) / 2 / this.maxSize;
		this.imgBox = {
			minX: i,
			maxX: i + e / this.maxSize,
			minY: a,
			maxY: a + t / this.maxSize
		}, this.buildTree();
	}
	buildTree() {
		let e = 0;
		for (let t = 0; t < this.nLevels; t++) {
			let n = 4 ** t;
			for (let r = 0; r < n; r++) {
				let n = {
					id: e + 1,
					level: t,
					isLeaf: t === this.nLevels - 1,
					childrenIndices: []
				};
				if (e > 0) {
					let t = e % 4, r = Math.ceil(e / 4) - 1;
					n.parentIndex = r;
					let i = this.nodes[r].box, a = i.minX + (i.maxX - i.minX) / 2, o = i.minY + (i.maxY - i.minY) / 2;
					t === 1 ? n.box = {
						minX: i.minX,
						minY: o,
						maxX: a,
						maxY: i.maxY
					} : t === 2 ? n.box = {
						minX: a,
						minY: o,
						maxX: i.maxX,
						maxY: i.maxY
					} : t === 3 ? n.box = {
						minX: i.minX,
						minY: i.minY,
						maxX: a,
						maxY: o
					} : t === 0 && (n.box = {
						minX: a,
						minY: i.minY,
						maxX: i.maxX,
						maxY: o
					}), n.isValid = this.boxesIntersect(n.box, this.imgBox);
				} else n.parentIndex = -1, n.box = {
					minX: 0,
					minY: 0,
					maxX: 1,
					maxY: 1
				}, n.isValid = !0;
				if (!n.isLeaf) for (let t = 0; t < 4; t++) n.childrenIndices.push(e * 4 + 1 + (t + 2) % 4);
				this.nodes.push(n), e++;
			}
		}
	}
	boxesIntersect(e, t) {
		return !(e.maxX < t.minX || e.minX > t.maxX || e.maxY < t.minY || e.minY > t.maxY);
	}
	getVisibleNodes(e, t) {
		let n = [];
		return this.traverse(0, e, t, n), n;
	}
	traverse(e, t, n, r) {
		let i = this.nodes[e];
		if (!i.isValid) return;
		let a = (i.box.minX - .5) * this.maxSize, o = (i.box.maxX - .5) * this.maxSize, s = (i.box.minY - .5) * this.maxSize, c = (i.box.maxY - .5) * this.maxSize;
		if (!(o < t.minX || a > t.maxX || c < t.minY || s > t.maxY)) if (n > this.tileSize && !i.isLeaf) {
			r.push({
				node: i,
				worldBox: {
					minX: a,
					maxX: o,
					minY: s,
					maxY: c
				},
				isFallback: !0
			});
			for (let e of i.childrenIndices) this.traverse(e, t, n / 2, r);
		} else r.push({
			node: i,
			worldBox: {
				minX: a,
				maxX: o,
				minY: s,
				maxY: c
			},
			isFallback: !1
		});
	}
};
//#endregion
//#region src/lib/viewerUrl.ts
function yl(e, t = .01) {
	return e ? Math.abs(e.r - 1) > t || Math.abs(e.g - 1) > t || Math.abs(e.b - 1) > t : !1;
}
function bl(e) {
	let t = (e || "").replace(/^#/, "").trim();
	if (!t) return {};
	let n = new URLSearchParams(t), r = {};
	if (n.has("lx") && n.has("ly")) {
		let e = parseFloat(n.get("lx")), t = parseFloat(n.get("ly"));
		if (!Number.isNaN(e) && !Number.isNaN(t)) {
			let n = e * e + t * t;
			r.lightDir = {
				x: e,
				y: t,
				z: n <= 1 ? Math.sqrt(1 - n) : 0
			};
		}
	}
	if (n.has("mode")) {
		let e = parseInt(n.get("mode"), 10);
		Number.isNaN(e) || (r.renderMode = e);
	}
	if (n.has("wbR") && n.has("wbG") && n.has("wbB")) {
		let e = parseFloat(n.get("wbR")), t = parseFloat(n.get("wbG")), i = parseFloat(n.get("wbB"));
		!Number.isNaN(e) && !Number.isNaN(t) && !Number.isNaN(i) && (r.colorGain = {
			r: e,
			g: t,
			b: i
		});
	}
	if (n.has("cx") && n.has("cy") && n.has("z")) {
		let e = parseFloat(n.get("cx")), t = parseFloat(n.get("cy")), i = parseFloat(n.get("z"));
		!Number.isNaN(e) && !Number.isNaN(t) && !Number.isNaN(i) && (r.camera = {
			cx: e,
			cy: t,
			z: i
		});
	}
	return r;
}
function xl(e, { camera: t, lightDir: n, renderMode: r, colorGain: i }) {
	let a = new URLSearchParams();
	return a.set("cx", t.cx.toFixed(4)), a.set("cy", t.cy.toFixed(4)), a.set("z", t.zoom.toFixed(4)), a.set("lx", n.x.toFixed(4)), a.set("ly", n.y.toFixed(4)), a.set("mode", String(r)), yl(i) && (a.set("wbR", i.r.toFixed(4)), a.set("wbG", i.g.toFixed(4)), a.set("wbB", i.b.toFixed(4))), `${e}#${a.toString()}`;
}
//#endregion
//#region src/lib/rtiInfoLoader.ts
var Sl = {
	HSH_RTI: 1,
	LRGB_PTM: 2,
	RGB_PTM: 3,
	IMAGE: 4
}, Cl = {
	HSH: 1,
	HSH_RTI: 1,
	LRGB_PTM: 2,
	RGB_PTM: 3,
	IMAGE: 4
};
function wl(e) {
	let t = e.content || e, n = e.tree || e;
	return {
		type: Sl[String(t.type)] ?? 4,
		width: t.width,
		height: t.height,
		tileSize: n.tileSize,
		layerCount: t.layerCount ?? t.coefficients ?? 1,
		bias: t.bias ?? [],
		scale: t.scale ?? []
	};
}
function Tl(e) {
	let t = new DOMParser().parseFromString(e, "text/xml"), n = (e) => t.getElementsByTagName(e)[0]?.textContent ?? null, r = t.getElementsByTagName("Content")[0], i = t.getElementsByTagName("Size")[0];
	if (r && i) {
		let e = r.getAttribute("type") ?? "", n = t.getElementsByTagName("Tree")[0], a = 256;
		if (n?.textContent) {
			let e = n.textContent.trim().split("\n");
			e.length > 1 && (a = parseInt(e[1], 10));
		}
		let o = t.getElementsByTagName("Bias")[0], s = t.getElementsByTagName("Scale")[0], c = o?.textContent ? o.textContent.trim().split(/\s+/).map(parseFloat) : [], l = s?.textContent ? s.textContent.trim().split(/\s+/).map(parseFloat) : [], u = parseInt(i.getAttribute("coefficients") ?? "3", 10) || 3, d = Cl[e] || 2, f = u;
		return d === 2 && (f = 3), {
			type: d,
			width: parseInt(i.getAttribute("width") ?? "0", 10),
			height: parseInt(i.getAttribute("height") ?? "0", 10),
			tileSize: a,
			layerCount: f,
			bias: c,
			scale: l
		};
	}
	return {
		type: parseInt(n("type") ?? "4", 10),
		width: parseInt(n("width") ?? "0", 10),
		height: parseInt(n("height") ?? "0", 10),
		tileSize: parseInt(n("tileSize") ?? "256", 10),
		layerCount: parseInt(n("layerCount") ?? "1", 10) || 1
	};
}
function El(e) {
	let t = e.split(/[?#]/)[0].trim().toLowerCase();
	return t.endsWith(".tif") || t.endsWith(".tiff");
}
async function Dl(e, t = {}) {
	if (El(e)) {
		if (!t.openTiff) throw Error("TIFF loader is required for .tif URLs");
		return t.openTiff(e);
	}
	let n = await fetch(`${e}/info.json`);
	if (n.ok) return wl(await n.json());
	let r = await fetch(`${e}/info.xml`);
	if (!r.ok) throw Error(`Could not load info from ${e}`);
	return Tl(await r.text());
}
//#endregion
//#region src/lib/openTiffDataset.ts
async function Ol(e) {
	let { TiffTileLoader: t } = await import("./TiffTileLoader-DrbyWZpF.js"), n = new t(e);
	return {
		loader: n,
		info: await n.open()
	};
}
function kl(e = 100) {
	let t = /* @__PURE__ */ new Map();
	function n(e) {
		if (!t.has(e)) return null;
		let n = t.get(e);
		return t.delete(e), t.set(e, n), n;
	}
	function r(n, r) {
		for (t.set(n, r); t.size > e;) {
			let e = t.keys().next().value;
			if (e === void 0) break;
			let n = t.get(e);
			n && n.forEach((e) => e.dispose?.()), t.delete(e);
		}
	}
	function i() {
		for (let e of t.values()) e.forEach((e) => e.dispose?.());
		t.clear();
	}
	return {
		get: n,
		set: r,
		dispose: i,
		size: () => t.size
	};
}
//#endregion
//#region src/lib/colorCorrection.ts
var Al = Object.freeze({
	x: 0,
	y: 0,
	z: 1
}), jl = .25, Ml = 3;
function Nl(e, t, n) {
	let r = .02, i = Math.max(e, r), a = Math.max(t, r), o = Math.max(n, r), s = .299 * i + .587 * a + .114 * o;
	return {
		r: Pl(s / i),
		g: Pl(s / a),
		b: Pl(s / o)
	};
}
function Pl(e) {
	return Math.min(Ml, Math.max(jl, e));
}
var Fl = {
	min: jl,
	max: Ml
}, Il = "\nuniform vec3 uColorGain;\n\nvec3 applyColorGain(vec3 color) {\n  return clamp(color * uColorGain, 0.0, 1.0);\n}\n";
//#endregion
//#region src/lib/meshUniforms.ts
function Ll(e) {
	return typeof e == "object" && !!e && (typeof e.copy == "function" || typeof e.set == "function");
}
function Rl({ tileMeshes: e, lightDir: t, renderMode: n, specularExponent: r, colorGainVector: i }) {
	function a(t) {
		for (let n of e.values()) n?.material?.uniforms && t(n.material.uniforms);
	}
	function o(e) {
		if (!e?.material?.uniforms) return;
		let a = e.material.uniforms;
		Ll(a.uLightDir?.value) && a.uLightDir.value.copy && a.uLightDir.value.copy(t.value), a.uRenderMode && (a.uRenderMode.value = n.value), a.uSpecularExponent && (a.uSpecularExponent.value = r.value), Ll(a.uColorGain?.value) && a.uColorGain.value.copy && a.uColorGain.value.copy(i);
	}
	function s(e) {
		a((t) => {
			t.uRenderMode && (t.uRenderMode.value = e);
		});
	}
	function c() {
		a((e) => {
			e.uSpecularExponent && (e.uSpecularExponent.value = r.value);
		});
	}
	function l() {
		a((e) => {
			Ll(e.uColorGain?.value) && e.uColorGain.value.copy && e.uColorGain.value.copy(i);
		});
	}
	function u() {
		a((e) => {
			Ll(e.uLightDir?.value) && e.uLightDir.value.set && e.uLightDir.value.set(Al.x, Al.y, Al.z);
		});
	}
	function d() {
		a((e) => {
			Ll(e.uColorGain?.value) && e.uColorGain.value.set && e.uColorGain.value.set(1, 1, 1);
		});
	}
	function f(e) {
		a((t) => {
			Ll(t.uLightDir?.value) && t.uLightDir.value.copy && t.uLightDir.value.copy(e);
		});
	}
	return {
		forEachMeshUniform: a,
		syncMeshUniforms: o,
		setRenderModeOnMeshes: s,
		updateSpecularOnMeshes: c,
		updateColorGainOnMeshes: l,
		setReferenceLightOnMeshes: u,
		setNeutralColorGainOnMeshes: d,
		restoreLightOnMeshes: f
	};
}
//#endregion
//#region src/lib/shaderChunks.ts
var zl = "\n  varying vec2 vUv;\n  varying vec2 vWorldPos;\n  void main() {\n    vUv = uv;\n    vec4 wPos = modelMatrix * vec4(position, 1.0);\n    vWorldPos = wPos.xy;\n    gl_Position = projectionMatrix * viewMatrix * wPos;\n  }\n", Bl = `
  uniform vec4 uBounds;
  uniform int uRenderMode;
  uniform float uSpecularExponent;
  ${Il}

  varying vec2 vUv;
  varying vec2 vWorldPos;

  bool outsideBounds(vec2 pos, vec4 bounds) {
    return pos.x < bounds.x || pos.x > bounds.y || pos.y < bounds.z || pos.y > bounds.w;
  }

  vec3 slopeHeatmap(vec3 N) {
    float steepness = 1.0 - N.z;
    vec3 heat = mix(vec3(0.0, 0.0, 0.8), vec3(0.0, 0.8, 0.2), clamp(steepness * 3.0, 0.0, 1.0));
    return mix(heat, vec3(1.0, 0.0, 0.0), clamp(steepness * 3.0 - 1.0, 0.0, 1.0));
  }

  vec3 shadedNormalColor(vec3 N, vec3 lightDir) {
    float diffuse = max(0.0, dot(N, normalize(lightDir)));
    vec3 normalColor = N * 0.5 + 0.5;
    return normalColor * (diffuse * 0.8 + 0.2);
  }
`;
function Vl(e) {
	return `${Bl}\n${e}`;
}
var Hl = `
  uniform vec4 uBounds;
  ${Il}

  varying vec2 vUv;
  varying vec2 vWorldPos;

  bool outsideBounds(vec2 pos, vec4 bounds) {
    return pos.x < bounds.x || pos.x > bounds.y || pos.y < bounds.z || pos.y > bounds.w;
  }
`;
function Ul(e) {
	return `${Hl}\n${e}`;
}
//#endregion
//#region src/lib/RtiShaders.ts
var Wl = Vl("\n  uniform vec3 uLightDir;\n  uniform sampler2D tex0;\n  uniform sampler2D tex1;\n  uniform sampler2D tex2;\n  uniform sampler2D tex3;\n  uniform vec4 uBias;\n  uniform vec4 uScale;\n\n  void main() {\n    if (outsideBounds(vWorldPos, uBounds)) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n\n    vec3 c0 = texture2D(tex0, vUv).xyz;\n    vec3 c1 = texture2D(tex1, vUv).xyz;\n    vec3 c2 = texture2D(tex2, vUv).xyz;\n    vec3 c3 = texture2D(tex3, vUv).xyz;\n\n    c0 = c0 * uBias.x + uScale.x;\n    c1 = c1 * uBias.y + uScale.y;\n    c2 = c2 * uBias.z + uScale.z;\n    c3 = c3 * uBias.w + uScale.w;\n\n    float cosTheta = uLightDir.z;\n    float cosTheta2 = cosTheta * cosTheta;\n\n    float phi = 0.0;\n    if (abs(uLightDir.x) > 0.0001 || abs(uLightDir.y) > 0.0001) {\n      phi = atan(uLightDir.y, uLightDir.x);\n      if (phi < 0.0) phi += 2.0 * 3.14159265;\n    }\n\n    float cosPhi = cos(phi);\n    float sinPhi = sin(phi);\n\n    float l0 = 1.0 / sqrt(2.0 * 3.14159265);\n    float l1 = sqrt(6.0 / 3.14159265) * (cosPhi * sqrt(max(0.0, cosTheta - cosTheta2)));\n    float l2 = sqrt(3.0 / (2.0 * 3.14159265)) * (-1.0 + 2.0 * cosTheta);\n    float l3 = sqrt(6.0 / 3.14159265) * (sqrt(max(0.0, cosTheta - cosTheta2)) * sinPhi);\n\n    vec3 color = c0 * l0 + c1 * l1 + c2 * l2 + c3 * l3;\n\n    if (uRenderMode == 0) {\n      gl_FragColor = vec4(applyColorGain(color), 1.0);\n    } else if (uRenderMode == 1) {\n      float lum = dot(color, vec3(0.299, 0.587, 0.114));\n      float specular = pow(max(0.0, lum), uSpecularExponent);\n      gl_FragColor = vec4(applyColorGain(color + vec3(specular * 0.8)), 1.0);\n    } else if (uRenderMode == 2) {\n      float nx = dot(c1, vec3(0.299, 0.587, 0.114));\n      float ny = -dot(c3, vec3(0.299, 0.587, 0.114));\n      float nz = dot(c2, vec3(0.299, 0.587, 0.114));\n      vec3 N = normalize(vec3(nx, ny, abs(nz) + 0.1));\n      gl_FragColor = vec4(applyColorGain(shadedNormalColor(N, uLightDir)), 1.0);\n    } else if (uRenderMode == 3) {\n      float nx = dot(c1, vec3(0.299, 0.587, 0.114));\n      float ny = -dot(c3, vec3(0.299, 0.587, 0.114));\n      float nz = dot(c2, vec3(0.299, 0.587, 0.114));\n      vec3 N = normalize(vec3(nx, ny, abs(nz) + 0.1));\n      gl_FragColor = vec4(applyColorGain(slopeHeatmap(N)), 1.0);\n    } else if (uRenderMode == 4) {\n      vec3 L2 = vec3(-uLightDir.x, -uLightDir.y, uLightDir.z);\n      float phi2 = 0.0;\n      if (abs(L2.x) > 0.0001 || abs(L2.y) > 0.0001) {\n        phi2 = atan(L2.y, L2.x);\n        if (phi2 < 0.0) phi2 += 2.0 * 3.14159265;\n      }\n      float l1_2 = sqrt(6.0 / 3.14159265) * (cos(phi2) * sqrt(max(0.0, cosTheta - cosTheta2)));\n      float l3_2 = sqrt(6.0 / 3.14159265) * (sqrt(max(0.0, cosTheta - cosTheta2)) * sin(phi2));\n      vec3 color2 = c0 * l0 + c1 * l1_2 + c2 * l2 + c3 * l3_2;\n      vec3 dualColor = (max(vec3(0.0), color) * vec3(1.0, 0.3, 0.1)) + (max(vec3(0.0), color2) * vec3(0.1, 0.5, 1.0));\n      gl_FragColor = vec4(applyColorGain(dualColor), 1.0);\n    }\n  }\n"), Gl = Vl("\n  uniform vec3 uLightDir;\n  uniform sampler2D tex0;\n  uniform sampler2D tex1;\n  uniform sampler2D tex2;\n  uniform vec3 uBias;\n  uniform vec3 uBias2;\n  uniform vec3 uScale;\n  uniform vec3 uScale2;\n\n  void main() {\n    if (outsideBounds(vWorldPos, uBounds)) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n\n    vec3 coeffH = texture2D(tex0, vUv).xyz;\n    vec3 coeffL = texture2D(tex1, vUv).xyz;\n    vec3 color  = texture2D(tex2, vUv).xyz;\n\n    float u = uLightDir.x;\n    float v = uLightDir.y;\n\n    float l0 = u * u;\n    float l1 = v * v;\n    float l2 = u * v;\n    float l3 = u;\n    float l4 = v;\n    float l5 = 1.0;\n\n    float a0 = (coeffH.x - uBias.x / 255.0) * uScale.x;\n    float a1 = (coeffH.y - uBias.y / 255.0) * uScale.y;\n    float a2 = (coeffH.z - uBias.z / 255.0) * uScale.z;\n    float a3 = (coeffL.x - uBias2.x / 255.0) * uScale2.x;\n    float a4 = (coeffL.y - uBias2.y / 255.0) * uScale2.y;\n    float a5 = (coeffL.z - uBias2.z / 255.0) * uScale2.z;\n\n    float lum = a0*l0 + a1*l1 + a2*l2 + a3*l3 + a4*l4 + a5*l5;\n\n    if (uRenderMode == 0) {\n      gl_FragColor = vec4(applyColorGain(color * lum), 1.0);\n    } else if (uRenderMode == 1) {\n      float specular = pow(max(0.0, lum), uSpecularExponent);\n      gl_FragColor = vec4(applyColorGain(color * lum + vec3(specular * 0.8)), 1.0);\n    } else if (uRenderMode == 2) {\n      float den = 4.0 * a0 * a1 - a2 * a2;\n      float u0 = (a2 * a4 - 2.0 * a1 * a3) / (den + 0.000001);\n      float v0 = (a2 * a3 - 2.0 * a0 * a4) / (den + 0.000001);\n      float r2 = u0*u0 + v0*v0;\n      if (r2 > 1.0) {\n        float len = sqrt(r2);\n        u0 /= len;\n        v0 /= len;\n        r2 = 1.0;\n      }\n      vec3 N = normalize(vec3(u0, -v0, sqrt(max(0.0, 1.0 - r2))));\n      gl_FragColor = vec4(applyColorGain(shadedNormalColor(N, uLightDir)), 1.0);\n    } else if (uRenderMode == 3) {\n      float den = 4.0 * a0 * a1 - a2 * a2;\n      float u0 = (a2 * a4 - 2.0 * a1 * a3) / (den + 0.000001);\n      float v0 = (a2 * a3 - 2.0 * a0 * a4) / (den + 0.000001);\n      float r2 = u0*u0 + v0*v0;\n      if (r2 > 1.0) r2 = 1.0;\n      float nz = sqrt(max(0.0, 1.0 - r2));\n      vec3 N = normalize(vec3(u0, -v0, nz));\n      gl_FragColor = vec4(applyColorGain(slopeHeatmap(N)), 1.0);\n    } else if (uRenderMode == 4) {\n      float u2 = -uLightDir.x;\n      float v2 = -uLightDir.y;\n      float lum2 = a0*(u2*u2) + a1*(v2*v2) + a2*(u2*v2) + a3*u2 + a4*v2 + a5;\n      vec3 dualColor = color * (vec3(1.0, 0.3, 0.1) * max(0.0, lum) + vec3(0.1, 0.5, 1.0) * max(0.0, lum2));\n      gl_FragColor = vec4(applyColorGain(dualColor), 1.0);\n    }\n  }\n"), Kl = Vl("\n  uniform vec3 uLightDir;\n  uniform sampler2D tex0;\n  uniform float uW1[112];\n  uniform float uB1[16];\n  uniform float uW2[256];\n  uniform float uB2[16];\n  uniform float uW3[48];\n  uniform float uB3[3];\n\n  vec3 evaluateMLP(vec3 lDir, vec4 latent) {\n    float x[7];\n    x[0] = latent.r;\n    x[1] = latent.g;\n    x[2] = latent.b;\n    x[3] = latent.a;\n    x[4] = lDir.x;\n    x[5] = lDir.y;\n    x[6] = lDir.z;\n\n    float h1[16];\n    for (int i = 0; i < 16; i++) {\n      float val = uB1[i];\n      for (int j = 0; j < 7; j++) {\n        val += uW1[i * 7 + j] * x[j];\n      }\n      h1[i] = max(0.0, val);\n    }\n\n    float h2[16];\n    for (int i = 0; i < 16; i++) {\n      float val = uB2[i];\n      for (int j = 0; j < 16; j++) {\n        val += uW2[i * 16 + j] * h1[j];\n      }\n      h2[i] = max(0.0, val);\n    }\n\n    float rgb[3];\n    for (int i = 0; i < 3; i++) {\n      float val = uB3[i];\n      for (int j = 0; j < 16; j++) {\n        val += uW3[i * 16 + j] * h2[j];\n      }\n      rgb[i] = 1.0 / (1.0 + exp(-val));\n    }\n\n    return vec3(rgb[0], rgb[1], rgb[2]);\n  }\n\n  void main() {\n    if (outsideBounds(vWorldPos, uBounds)) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n\n    vec4 latent = texture2D(tex0, vUv);\n    vec3 color = evaluateMLP(uLightDir, latent);\n\n    if (uRenderMode == 0) {\n      gl_FragColor = vec4(applyColorGain(color), 1.0);\n    } else if (uRenderMode == 5) {\n      gl_FragColor = vec4(applyColorGain(latent.rgb), 1.0);\n    } else {\n      float eps = 0.005;\n      float z_eps = sqrt(1.0 - eps * eps);\n\n      vec3 c0 = evaluateMLP(vec3(0.0, 0.0, 1.0), latent);\n      vec3 cx = evaluateMLP(vec3(eps, 0.0, z_eps), latent);\n      vec3 cy = evaluateMLP(vec3(0.0, eps, z_eps), latent);\n\n      float y0 = dot(c0, vec3(0.299, 0.587, 0.114));\n      float yx = dot(cx, vec3(0.299, 0.587, 0.114));\n      float yy = dot(cy, vec3(0.299, 0.587, 0.114));\n\n      float gx = (yx - y0) / eps;\n      float gy = (yy - y0) / eps;\n      vec3 N = normalize(vec3(-gx * 4.0, -gy * 4.0, 1.0));\n\n      if (uRenderMode == 1) {\n        vec3 L = normalize(uLightDir);\n        vec3 V = vec3(0.0, 0.0, 1.0);\n        vec3 H = normalize(L + V);\n        float specular = pow(max(0.0, dot(N, H)), uSpecularExponent);\n        gl_FragColor = vec4(applyColorGain(color + vec3(specular * 0.8)), 1.0);\n      } else if (uRenderMode == 2) {\n        gl_FragColor = vec4(applyColorGain(shadedNormalColor(N, uLightDir)), 1.0);\n      } else if (uRenderMode == 3) {\n        gl_FragColor = vec4(applyColorGain(slopeHeatmap(N)), 1.0);\n      } else if (uRenderMode == 4) {\n        vec3 color2 = evaluateMLP(vec3(-uLightDir.x, -uLightDir.y, uLightDir.z), latent);\n        vec3 dualColor = (max(vec3(0.0), color) * vec3(1.0, 0.3, 0.1)) + (max(vec3(0.0), color2) * vec3(0.1, 0.5, 1.0));\n        gl_FragColor = vec4(applyColorGain(dualColor), 1.0);\n      }\n    }\n  }\n");
function ql(e) {
	return e?.clone?.() ?? new t(1, 1, 1);
}
var Jl = (t, r, i, a, o, s) => new n({
	uniforms: {
		uLightDir: { value: r },
		tex0: { value: t[0] || null },
		tex1: { value: t[1] || null },
		tex2: { value: t[2] || null },
		tex3: { value: t[3] || null },
		uBias: { value: new e(i[0] || 0, i[1] || 0, i[2] || 0, i[3] || 0) },
		uScale: { value: new e(a[0] || 0, a[1] || 0, a[2] || 0, a[3] || 0) },
		uBounds: { value: o },
		uRenderMode: { value: 0 },
		uSpecularExponent: { value: 10 },
		uColorGain: { value: ql(s) }
	},
	vertexShader: zl,
	fragmentShader: Wl,
	transparent: !0
}), Yl = (e, r, i, a, o, s) => {
	for (; i.length < 6;) i.push(0);
	for (; a.length < 6;) a.push(1);
	return new n({
		uniforms: {
			uLightDir: { value: r },
			tex0: { value: e[0] || null },
			tex1: { value: e[1] || null },
			tex2: { value: e[2] || null },
			uBias: { value: new t(i[0], i[1], i[2]) },
			uBias2: { value: new t(i[3], i[4], i[5]) },
			uScale: { value: new t(a[0], a[1], a[2]) },
			uScale2: { value: new t(a[3], a[4], a[5]) },
			uBounds: { value: o },
			uRenderMode: { value: 0 },
			uSpecularExponent: { value: 10 },
			uColorGain: { value: ql(s) }
		},
		vertexShader: zl,
		fragmentShader: Gl,
		transparent: !0
	});
}, Xl = (e, t, r, i, a) => {
	let o = [];
	for (let e = 0; e < 16; e++) for (let t = 0; t < 7; t++) o.push(r.w1[e][t]);
	let s = r.b1, c = [];
	for (let e = 0; e < 16; e++) for (let t = 0; t < 16; t++) c.push(r.w2[e][t]);
	let l = r.b2, u = [];
	for (let e = 0; e < 3; e++) for (let t = 0; t < 16; t++) u.push(r.w3[e][t]);
	let d = r.b3;
	return new n({
		uniforms: {
			uLightDir: { value: t },
			tex0: { value: e[0] || null },
			uBounds: { value: i },
			uW1: { value: new Float32Array(o) },
			uB1: { value: new Float32Array(s) },
			uW2: { value: new Float32Array(c) },
			uB2: { value: new Float32Array(l) },
			uW3: { value: new Float32Array(u) },
			uB3: { value: new Float32Array(d) },
			uRenderMode: { value: 0 },
			uSpecularExponent: { value: 10 },
			uColorGain: { value: ql(a) }
		},
		vertexShader: zl,
		fragmentShader: Kl,
		transparent: !0
	});
}, Zl = Ul("\n  uniform sampler2D tex0;\n\n  void main() {\n    if (outsideBounds(vWorldPos, uBounds)) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n    vec3 color = texture2D(tex0, vUv).xyz;\n    gl_FragColor = vec4(applyColorGain(color), 1.0);\n  }\n"), Ql = (e, r, i) => new n({
	uniforms: {
		tex0: { value: e || null },
		uBounds: { value: r },
		uColorGain: { value: i?.clone?.() ?? new t(1, 1, 1) }
	},
	vertexShader: zl,
	fragmentShader: Zl,
	transparent: !0
});
//#endregion
//#region src/lib/rtiMaterialFactory.ts
function $l(t) {
	return new e((t.imgBox.minX - .5) * t.maxSize, (t.imgBox.maxX - .5) * t.maxSize, (t.imgBox.minY - .5) * t.maxSize, (t.imgBox.maxY - .5) * t.maxSize);
}
function eu({ rtiInfo: e, textures: t, lightDir: n, bounds: r, colorGain: i }) {
	return e.type === 5 && e.weights ? Xl(t, n, e.weights, r, i) : e.type === 1 ? Jl(t, n, e.bias ?? [], e.scale ?? [], r, i) : e.type === 2 ? Yl(t, n, e.bias ?? [], e.scale ?? [], r, i) : Ql(t[0], r, i);
}
//#endregion
//#region src/lib/tileMeshLoader.ts
function tu({ scene: e, quadtree: t, rtiInfo: n, url: r, tiffLoader: a, textureCache: s, textureLoader: c, tileMeshes: u, loadingTileIds: d, syncMeshUniforms: f, getLightDir: p, getColorGain: m, debug: h = !1 }) {
	function g(g, _) {
		if (!e.value || !t.value || !n.value) return;
		let v = _.maxX - _.minX, y = _.maxY - _.minY, b = _.minX + v / 2, x = _.minY + y / 2;
		d.add(g.id);
		let S = new l({
			color: 3355443,
			wireframe: !0
		}), C = new i(new o(v, y), S);
		C.position.set(b, x, g.level * .1), e.value.add(C), u.set(g.id, C);
		let w = (e) => {
			if (!t.value || !n.value) return;
			let r = $l(t.value), i = eu({
				rtiInfo: n.value,
				textures: e,
				lightDir: p(),
				bounds: r,
				colorGain: m()
			});
			f({ material: i }), C.material = i, C.geometry = new o(v, y), d.delete(g.id);
		}, T = `${r.value}_${g.id}`, E = s.get(T);
		if (E) {
			w(E);
			return;
		}
		let D = (e) => {
			s.set(T, e), w(e);
		};
		if (a.value) {
			a.value.loadTileTextures(g, t.value.nLevels, n.value.tileSize).then((e) => {
				if (!e || e.length === 0) {
					d.delete(g.id);
					return;
				}
				D(e);
			}).catch((e) => {
				console.error(`[TiffTileLoader] Error loading tile for node ${g.id}:`, e), d.delete(g.id);
			});
			return;
		}
		let O = [], ee = 0, k = n.value.layerCount;
		for (let e = 0; e < k; e++) {
			let t = `${r.value}/${g.id}_${e + 1}.jpg`;
			h && console.log(`[RTI Viewer] Requesting image: ${t}`), c.load(t, (t) => {
				O[e] = t, t.colorSpace = "", ee++, ee === k && D(O);
			}, void 0, (t) => {
				console.error(`Error loading tile ${g.id}_${e + 1}:`, t), d.delete(g.id);
			});
		}
	}
	return { loadTileMesh: g };
}
//#endregion
//#region src/composables/useRtiRenderer.ts
function nu({ containerWrapper: e, container: t, url: n, lightDir: i, renderMode: a, specularExponent: o, colorGainVector: c, getPanEnabled: l, onResize: f, onFrame: p, debug: m = !1 }) {
	let _ = /* @__PURE__ */ W(null), v = /* @__PURE__ */ rn(null), y = /* @__PURE__ */ rn(null), b = /* @__PURE__ */ rn(null), x = /* @__PURE__ */ rn(null), S = /* @__PURE__ */ rn(null), C = /* @__PURE__ */ rn(null), w = /* @__PURE__ */ W(0), T = null, E = null, D = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Map(), ee = new r(), k = kl(), { syncMeshUniforms: A, setRenderModeOnMeshes: te, updateSpecularOnMeshes: j, updateColorGainOnMeshes: ne, setReferenceLightOnMeshes: M, setNeutralColorGainOnMeshes: N, restoreLightOnMeshes: P } = Rl({
		tileMeshes: O,
		lightDir: i,
		renderMode: a,
		specularExponent: o,
		colorGainVector: c
	}), F = () => {};
	async function re() {
		let e = await Dl(n.value, { openTiff: async (e) => {
			let { loader: t, info: n } = await Ol(e);
			if (!n) throw Error(`Failed to open TIFF: ${e}`);
			return C.value = t, n;
		} });
		return _.value = e, e;
	}
	function ie() {
		_.value && (S.value = new vl(_.value.width, _.value.height, _.value.tileSize));
	}
	function I() {
		if (!e.value || !t.value || !_.value) throw Error("Cannot initialize renderer: missing container or RTI info");
		let r = e.value, a = t.value, o = _.value, f = r.clientWidth, w = r.clientHeight, te = new s();
		te.background = new u(988970), v.value = te;
		let j = f / w, ne = Math.max(o.width, o.height) / 2, M = new g(-ne * j, ne * j, ne, -ne, .1, 1e3);
		y.value = M;
		let N = bl(window.location.hash), P = N.camera?.cx, re = N.camera?.cy, ie = N.camera?.z;
		P !== void 0 && re !== void 0 && ie !== void 0 ? (M.position.set(P, re, 10), M.zoom = ie, M.updateProjectionMatrix()) : M.position.set(0, 0, 10);
		let I = new h({
			antialias: !1,
			preserveDrawingBuffer: !0
		});
		I.setSize(f, w), I.setPixelRatio(window.devicePixelRatio), x.value = I, a.appendChild(I.domElement);
		let ae = new al(M, I.domElement);
		b.value = ae, P !== void 0 && re !== void 0 && ae.target.set(P, re, 0), ae.enableRotate = !1, ae.screenSpacePanning = !0, ae.mouseButtons = {
			LEFT: d.PAN,
			MIDDLE: d.DOLLY,
			RIGHT: null
		}, ae.enableDamping = !0, ae.dampingFactor = .05, ae.enabled = l(), {loadTileMesh: F} = tu({
			scene: v,
			quadtree: S,
			rtiInfo: _,
			url: n,
			tiffLoader: C,
			textureCache: k,
			textureLoader: ee,
			tileMeshes: O,
			loadingTileIds: D,
			syncMeshUniforms: A,
			getLightDir: () => i.value,
			getColorGain: () => c,
			debug: m
		}), window.addEventListener("resize", oe), E = new ResizeObserver(() => oe()), E.observe(r);
		let se = () => {
			T = requestAnimationFrame(se), ae.update(), ce(), p?.(), I.render(te, M);
		};
		return se(), N;
	}
	function ae() {
		window.removeEventListener("resize", oe), E?.disconnect(), E = null, T && cancelAnimationFrame(T), T = null, x.value && (x.value.dispose(), t.value?.removeChild(x.value.domElement)), b.value && b.value.dispose(), k.dispose(), O.clear(), D.clear(), w.value = 0, v.value = null, y.value = null, x.value = null, b.value = null, S.value = null, C.value = null, _.value = null;
	}
	function oe() {
		if (!e.value || !y.value || !x.value || !_.value) return;
		let t = e.value.clientWidth, n = e.value.clientHeight, r = t / n, i = Math.max(_.value.width, _.value.height) / 2;
		y.value.left = -i * r, y.value.right = i * r, y.value.top = i, y.value.bottom = -i, y.value.updateProjectionMatrix(), x.value.setSize(t, n), f?.();
	}
	function se(e) {
		b.value && (b.value.enabled = e);
	}
	function ce() {
		if (!S.value || !y.value || !x.value || !v.value) return;
		let e = y.value, t = v.value, n = x.value, r = {
			minX: e.position.x + e.left / e.zoom,
			maxX: e.position.x + e.right / e.zoom,
			minY: e.position.y + e.bottom / e.zoom,
			maxY: e.position.y + e.top / e.zoom
		}, i = (e.top - e.bottom) / e.zoom, a = n.domElement.clientHeight / i, o = S.value.maxSize * a;
		if (m) {
			let e = y.value.zoom.toFixed(2);
			(!window._lastLoggedZoom || window._lastLoggedZoom !== e) && (console.log(`[RTI Viewer] Zoom: ${e} | Projected Tile: ${o.toFixed(1)}px | Active Meshes: ${w.value}`), window._lastLoggedZoom = e);
		}
		let s = S.value.getVisibleNodes(r, o), c = new Set(s.map((e) => e.node.id));
		if (m) {
			let e = s.filter((e) => !O.has(e.node.id));
			if (e.length > 0) {
				let t = e.map((e) => `[ID:${e.node.id} L:${e.node.level}]`).join(", ");
				console.log(`[RTI Viewer] Loading ${e.length} new tiles: ${t}`);
			}
		}
		if (D.size === 0) for (let [e, n] of O.entries()) c.has(e) || (t.remove(n), n.geometry.dispose(), n.material && n.material.dispose(), O.delete(e));
		for (let { node: e, worldBox: t } of s) O.has(e.id) ? A(O.get(e.id)) : F(e, t);
		w.value = O.size;
	}
	function L() {
		!x.value || !v.value || !y.value || x.value.render(v.value, y.value);
	}
	function le() {
		return x.value ? (L(), x.value.domElement.toDataURL("image/png")) : null;
	}
	function R(e, t) {
		if (!x.value || !v.value || !y.value) return null;
		let n = i.value.clone();
		M(), N(), L();
		let r = x.value.domElement.getBoundingClientRect(), a = x.value.getPixelRatio(), o = Math.floor((e - r.left) * a), s = Math.floor((r.bottom - t) * a), c = /* @__PURE__ */ new Uint8Array(4), l = x.value.getContext();
		l.readPixels(o, s, 1, 1, l.RGBA, l.UNSIGNED_BYTE, c), P(n), ne();
		let u = c[0] / 255, d = c[1] / 255, f = c[2] / 255;
		return u + d + f < .03 ? null : {
			r: u,
			g: d,
			b: f
		};
	}
	function ue(e) {
		return e.lightDir && i.value.set(e.lightDir.x, e.lightDir.y, e.lightDir.z).normalize(), e.renderMode !== void 0 && (a.value = e.renderMode), e.colorGain ? (c.set(e.colorGain.r, e.colorGain.g, e.colorGain.b), e.colorGain) : null;
	}
	return {
		rtiInfo: _,
		scene: v,
		camera: y,
		controls: b,
		renderer: x,
		quadtree: S,
		tiffLoader: C,
		activeMeshesCount: w,
		fetchRtiInfo: re,
		initQuadtree: ie,
		init: I,
		dispose: ae,
		resize: oe,
		setControlsEnabled: se,
		setRenderModeOnMeshes: te,
		updateSpecularOnMeshes: j,
		updateColorGainOnMeshes: ne,
		setReferenceLightOnMeshes: M,
		setNeutralColorGainOnMeshes: N,
		restoreLightOnMeshes: P,
		renderFrame: L,
		exportPng: le,
		sampleColorAtScreen: R,
		applyUrlView: ue
	};
}
//#endregion
//#region src/lib/annotationCoords.ts
function ru(e) {
	if (!e) return null;
	let { imgBox: t, maxSize: n } = e;
	return {
		minX: (t.minX - .5) * n,
		maxX: (t.maxX - .5) * n,
		minY: (t.minY - .5) * n,
		maxY: (t.maxY - .5) * n,
		width: (t.maxX - t.minX) * n,
		height: (t.maxY - t.minY) * n
	};
}
function iu(e, t, n) {
	let r = ru(n);
	return !r || r.width <= 0 || r.height <= 0 ? null : {
		x: (e - r.minX) / r.width,
		y: (t - r.minY) / r.height
	};
}
function au(e, t, n) {
	let r = ru(n);
	return r ? {
		x: r.minX + e * r.width,
		y: r.minY + t * r.height
	} : null;
}
function ou(e, t, n, r) {
	if (!n || !r) return null;
	let i = r.clientWidth, a = r.clientHeight, o = (n.right - n.left) / n.zoom, s = (n.top - n.bottom) / n.zoom, c = n.position.x + n.left / n.zoom, l = n.position.y + n.bottom / n.zoom;
	return {
		x: (e - c) / o * i,
		y: a - (t - l) / s * a
	};
}
function su(e, t, n, r) {
	if (!n || !r) return null;
	let i = r.clientWidth, a = r.clientHeight, o = (n.right - n.left) / n.zoom, s = (n.top - n.bottom) / n.zoom, c = n.position.x + n.left / n.zoom, l = n.position.y + n.bottom / n.zoom;
	return {
		x: c + e / i * o,
		y: l + (a - t) / a * s
	};
}
function cu(e, t, n, r) {
	let i = au(.5, .5, t), a = au(.5 + e, .5, t);
	if (!i || !a) return 0;
	let o = ou(i.x, i.y, n, r), s = ou(a.x, a.y, n, r);
	return !o || !s ? 0 : Math.abs(s.x - o.x);
}
//#endregion
//#region src/types/annotations.ts
function lu(e, t = 72) {
	let n = String(e || "").trim();
	return n.length <= t ? n : `${n.slice(0, t - 1)}…`;
}
function uu(e) {
	return Math.min(Math.max(e.length * 6.2, 40), 280);
}
function du(e) {
	return e.kind === "rect" ? {
		x: e.x + 4,
		y: e.y - 8
	} : {
		x: e.cx + e.r + 10,
		y: e.cy + 4
	};
}
function fu(e, t, n, r) {
	let i = n.color || "#f59e0b", a = n.draft || !1, o = n.key ?? Math.random(), s = a ? "" : lu(n.label || ""), c = null;
	if (e === "point") {
		let e = t.position, n = r.normToScreen(e[0], e[1]);
		if (!n) return null;
		c = {
			kind: "point",
			key: o,
			cx: n.x,
			cy: n.y,
			r: 6,
			color: i,
			draft: a
		};
	} else if (e === "circle") {
		if (!t?.center) return null;
		let e = t.center, n = r.circleToScreen(e, t.radius || 0);
		if (!n) return null;
		c = {
			kind: "circle",
			key: o,
			cx: n.cx,
			cy: n.cy,
			r: Math.max(n.r, 2),
			color: i,
			draft: a
		};
	} else if (e === "rectangle") {
		let e = r.normToScreen(t.x1, t.y1), n = r.normToScreen(t.x2, t.y2);
		if (!e || !n) return null;
		c = {
			kind: "rect",
			key: o,
			x: Math.min(e.x, n.x),
			y: Math.min(e.y, n.y),
			w: Math.max(Math.abs(n.x - e.x), 2),
			h: Math.max(Math.abs(n.y - e.y), 2),
			color: i,
			draft: a
		};
	}
	if (!c) return null;
	if (!a && n.annotationId && (c.annotationId = n.annotationId, c.ann = n.ann), s) {
		let e = du(c);
		c.label = s, c.labelX = e.x, c.labelY = e.y, c.labelWidth = uu(s);
	}
	return c;
}
function pu(e, t, n, r) {
	let i = [];
	for (let t of e) {
		let e = fu(t.type || "circle", t.geometry, {
			key: t.id,
			annotationId: t.id,
			ann: t,
			color: t.color,
			label: t.label
		}, r);
		e && i.push(e);
	}
	if (t) {
		let e = fu(t.type, t.geometry, {
			key: "draft",
			color: n,
			draft: !0
		}, r);
		e && i.push(e);
	}
	return i;
}
//#endregion
//#region src/composables/useAnnotations.ts
function mu({ enabled: e, currentMode: t, renderer: n, camera: r, quadtree: i, onCreate: a, onClick: o, captureRtiView: s }) {
	let c = /* @__PURE__ */ W(null), l = /* @__PURE__ */ W([]), u = /* @__PURE__ */ W([]), d = /* @__PURE__ */ W({
		w: 1,
		h: 1
	}), f = /* @__PURE__ */ W(null), p = /* @__PURE__ */ W("circle"), m = /* @__PURE__ */ W(tc()), h = /* @__PURE__ */ W(!1), g = /* @__PURE__ */ W(null), _ = !1, v = null, y = Qa(() => Us.find((e) => e.id === p.value) ?? Us[1]);
	function b() {
		return c.value?.overlayEl ?? null;
	}
	function x() {
		let e = b();
		if (!e) return;
		let { width: t, height: n } = e.getBoundingClientRect(), r = Math.round(t) || 1, i = Math.round(n) || 1;
		(d.value.w !== r || d.value.h !== i) && (d.value = {
			w: r,
			h: i
		});
	}
	function S(e) {
		if (!n.value || !i.value || !r.value) return null;
		let t = n.value.domElement.getBoundingClientRect(), a = su(e.clientX - t.left, e.clientY - t.top, r.value, n.value.domElement);
		if (!a) return null;
		let o = iu(a.x, a.y, i.value);
		return !o || o.x < 0 || o.x > 1 || o.y < 0 || o.y > 1 ? null : o;
	}
	function C() {
		let e = n.value?.domElement, t = i.value, a = r.value;
		return !e || !t || !a ? null : {
			normToScreen(n, r) {
				let i = au(n, r, t);
				return i ? ou(i.x, i.y, a, e) : null;
			},
			circleToScreen(n, r) {
				let i = au(n[0], n[1], t);
				if (!i) return null;
				let o = ou(i.x, i.y, a, e);
				if (!o) return null;
				let s = cu(r, t, a, e);
				return {
					cx: o.x,
					cy: o.y,
					r: s
				};
			}
		};
	}
	function w() {
		if (!e() || !n.value || !i.value || !r.value) {
			u.value = [];
			return;
		}
		x();
		let t = C();
		if (!t) {
			u.value = [];
			return;
		}
		u.value = pu(l.value, f.value, m.value, t);
	}
	function T(e) {
		l.value = Ys(e), w();
	}
	function E(e) {
		g.value = e ?? null;
	}
	function D() {
		h.value = !1, f.value = null, v = null, _ = !1;
	}
	function O(e) {
		if (t.value === "annotate") {
			h.value = !h.value;
			return;
		}
		e("annotate"), h.value = !0;
	}
	function ee(e, t) {
		p.value = e, h.value = !1, t("annotate");
	}
	function k(e) {
		m.value = e, nc(e);
	}
	function A(e) {
		return e.draft || t.value === "annotate" || !e.annotationId ? "pointer-events-none" : "pointer-events-auto cursor-pointer";
	}
	function te(e) {
		e.draft || t.value === "annotate" || !e.ann || (g.value = e.annotationId ?? null, o(e.ann));
	}
	function j(e, t) {
		a({
			type: e,
			geometry: t,
			color: m.value,
			rtiView: s()
		});
	}
	function ne(e) {
		if (t.value !== "annotate") return;
		e.stopPropagation();
		let n = S(e);
		n && (v = n, _ = !0, b()?.setPointerCapture(e.pointerId), p.value === "circle" ? f.value = {
			type: "circle",
			geometry: {
				center: [n.x, n.y],
				radius: 0
			}
		} : p.value === "rectangle" ? f.value = {
			type: "rectangle",
			geometry: {
				x1: n.x,
				y1: n.y,
				x2: n.x,
				y2: n.y
			}
		} : f.value = null, w(), e.preventDefault());
	}
	function M(e) {
		if (!_ || !f.value) return;
		let t = S(e);
		if (!t) return;
		let n = f.value;
		if (n.type === "circle") {
			let e = n.geometry.center, r = {
				x: e[0],
				y: e[1]
			};
			f.value = {
				type: "circle",
				geometry: {
					center: n.geometry.center,
					radius: Math.hypot(t.x - r.x, t.y - r.y)
				}
			};
		} else n.type === "rectangle" && (f.value = {
			type: "rectangle",
			geometry: {
				x1: n.geometry.x1,
				y1: n.geometry.y1,
				x2: t.x,
				y2: t.y
			}
		});
		w();
	}
	function N(e) {
		if (!_) return;
		if (_ = !1, b()?.releasePointerCapture(e.pointerId), p.value === "point") {
			let t = S(e);
			v && t && Zs(v, t) && j("point", { position: [v.x, v.y] }), v = null, w();
			return;
		}
		let t = f.value;
		if (f.value = null, v = null, !t || !Xs(t.type, t.geometry)) {
			w();
			return;
		}
		j(t.type, t.geometry), w();
	}
	return {
		overlayComponentRef: c,
		displayedAnnotations: l,
		overlayShapes: u,
		overlaySize: d,
		annotationShape: p,
		annotationColor: m,
		shapeMenuOpen: h,
		selectedAnnotationId: g,
		activeShapeOption: y,
		syncOverlaySize: x,
		updateOverlayShapes: w,
		setAnnotations: T,
		selectAnnotation: E,
		clearDrawingState: D,
		toggleAnnotateMode: O,
		selectAnnotationShape: ee,
		selectAnnotationColor: k,
		pointerToImageNorm: S,
		shapeInteractionClass: A,
		onShapeClick: te,
		onAnnotationPointerDown: ne,
		onAnnotationPointerMove: M,
		onAnnotationPointerUp: N
	};
}
//#endregion
//#region src/lib/lightDirection.ts
var hu = .95;
function gu(e, t) {
	let n = e * 2 - 1, r = -(t * 2 - 1), i = n * n + r * r, a = hu * hu;
	if (i > a) {
		let e = Math.sqrt(i);
		n = n / e * hu, r = r / e * hu, i = a;
	}
	let o = Math.sqrt(1 - i);
	return {
		x: n,
		y: r,
		z: o
	};
}
function _u(e, t, n) {
	let r = Math.min(n.width, n.height), i = n.width / 2, a = n.height / 2;
	return {
		x: (e - n.left - i) / r + .5,
		y: (t - n.top - a) / r + .5
	};
}
function vu(e, t, n) {
	let r = (e - n.left) / n.width, i = (t - n.top) / n.height;
	return {
		x: Math.max(0, Math.min(1, r)),
		y: Math.max(0, Math.min(1, i))
	};
}
//#endregion
//#region src/composables/useRtiInteraction.ts
function yu(e, t, n, r) {
	return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
function bu({ currentMode: e, lightDir: t, container: n, getRenderer: r, getCompassEl: i, setControlsEnabled: a, onLeaveAnnotate: o, onLeaveWhiteBalance: s, onWhiteBalancePick: c }) {
	let l = null;
	function u(e, n) {
		let r = gu(e, n);
		t.value.set(r.x, r.y, r.z).normalize();
	}
	function d(t = e.value) {
		if (!n.value) return;
		let i = t === "light" || t === "annotate" || t === "whitebalance";
		n.value.style.touchAction = i ? "none" : "auto", n.value.style.cursor = t === "whitebalance" ? "crosshair" : "";
		let a = r()?.domElement;
		a && (a.style.pointerEvents = t === "annotate" ? "none" : "auto", a.style.cursor = t === "whitebalance" ? "crosshair" : "");
	}
	function f(t) {
		e.value = t, a(t === "pan"), t !== "annotate" && o?.(), t !== "whitebalance" && s?.(), d(t);
	}
	function p() {
		if (e.value === "whitebalance") {
			f("pan");
			return;
		}
		f("whitebalance");
	}
	function m() {
		l?.();
		let t = [];
		if (!n.value) return;
		let r = n.value, a = !1, o = !1, s = (e) => {
			let t = r.getBoundingClientRect(), n = _u(e.clientX, e.clientY, t);
			u(n.x, n.y);
		};
		t.push(yu(r, "pointerdown", (t) => {
			let n = t;
			e.value === "light" ? (a = !0, r.setPointerCapture(n.pointerId), s(n)) : e.value === "whitebalance" && c?.(n);
		})), t.push(yu(r, "pointermove", (t) => {
			e.value === "light" && a && s(t);
		}));
		let f = (e) => {
			a &&= (r.releasePointerCapture(e.pointerId), !1);
		};
		t.push(yu(r, "pointerup", f)), t.push(yu(r, "pointercancel", f));
		let p = i?.();
		if (p) {
			let e = (e) => {
				let t = p.getBoundingClientRect(), n = vu(e.clientX, e.clientY, t);
				u(n.x, n.y);
			};
			t.push(yu(p, "pointerdown", (t) => {
				let n = t;
				o = !0, p.setPointerCapture(n.pointerId), e(n);
			})), t.push(yu(p, "pointermove", (t) => {
				o && e(t);
			}));
			let n = (e) => {
				o &&= (p.releasePointerCapture(e.pointerId), !1);
			};
			t.push(yu(p, "pointerup", n)), t.push(yu(p, "pointercancel", n));
		}
		d(), l = () => t.forEach((e) => e());
	}
	function h() {
		l?.(), l = null;
	}
	return {
		setMode: f,
		toggleWhiteBalanceMode: p,
		updateLightFromNormalized: u,
		applyPointerStyles: d,
		setup: m,
		dispose: h
	};
}
//#endregion
//#region src/composables/useWhiteBalance.ts
function xu({ currentMode: e, colorGainVector: t, updateColorGainOnMeshes: n, pointerToImageNorm: r, sampleColorAtScreen: i }) {
	let a = /* @__PURE__ */ W({
		r: 1,
		g: 1,
		b: 1
	}), o = /* @__PURE__ */ W(""), s = null, c = Qa(() => yl(a.value));
	function l() {
		t.set(a.value.r, a.value.g, a.value.b);
	}
	function u() {
		l(), n();
	}
	function d(t) {
		o.value = t, s && clearTimeout(s), s = setTimeout(() => {
			e.value === "whitebalance" && (o.value = "");
		}, 2200);
	}
	function f() {
		o.value = "";
	}
	function p(e) {
		if (!r(e)) {
			d("Click inside the image");
			return;
		}
		let t = i(e.clientX, e.clientY);
		if (!t) {
			d("No color at this location");
			return;
		}
		a.value = Nl(t.r, t.g, t.b), u(), d("White balance applied");
	}
	function m() {
		a.value = {
			r: 1,
			g: 1,
			b: 1
		}, u(), d("White balance reset");
	}
	function h(e) {
		a.value = e, u();
	}
	function g(e) {
		e && (a.value = { ...e }, u());
	}
	return {
		colorGain: a,
		wbPickFeedback: o,
		whiteBalanceActive: c,
		gainMin: Fl.min,
		gainMax: Fl.max,
		updateColorGain: u,
		syncColorGainVector: l,
		pick: p,
		reset: m,
		onColorGainUpdate: h,
		showFeedback: d,
		clearFeedback: f,
		applyColorGain: g
	};
}
//#endregion
//#region src/lib/viewerViewState.ts
function Su({ lightDir: e, renderMode: t, specularExponent: n, colorGain: r, camera: i, controls: a }) {
	return {
		lightDir: {
			x: e.x,
			y: e.y,
			z: e.z
		},
		renderMode: t,
		specularExponent: n,
		colorGain: { ...r },
		camera: {
			cx: i?.position.x ?? 0,
			cy: i?.position.y ?? 0,
			zoom: i?.zoom ?? 1,
			targetX: a?.target.x ?? 0,
			targetY: a?.target.y ?? 0
		}
	};
}
function Cu(e, { lightDir: t, renderMode: n, specularExponent: r, colorGain: i, camera: a, controls: o, setRenderMode: s, updateSpecular: c, updateColorGain: l, onApplied: u }) {
	if (!e || !a.value || !o.value) return;
	e.lightDir && t.value.set(e.lightDir.x, e.lightDir.y, e.lightDir.z).normalize(), e.renderMode !== void 0 && (n.value = e.renderMode, s(e.renderMode)), e.specularExponent !== void 0 && (r.value = e.specularExponent, c()), e.colorGain && (i.value = {
		r: e.colorGain.r ?? 1,
		g: e.colorGain.g ?? 1,
		b: e.colorGain.b ?? 1
	}, l());
	let d = e.camera?.cx ?? 0, f = e.camera?.cy ?? 0;
	a.value.position.set(d, f, 10), e.camera?.zoom && (a.value.zoom = e.camera.zoom, a.value.updateProjectionMatrix()), o.value.target.set(e.camera?.targetX ?? d, e.camera?.targetY ?? f, 0), o.value.update(), u?.();
}
//#endregion
//#region src/composables/useViewerChrome.ts
function wu({ rootWrapper: e, sidebarComponentRef: t, shareUrl: n, lightDir: r, renderMode: i, specularExponent: a, colorGain: o, camera: s, controls: c, exportPng: l, setRenderMode: u, updateSpecular: d, updateColorGain: f, onViewRestored: p, hostHandlers: m }) {
	let h = /* @__PURE__ */ W(!1), g = /* @__PURE__ */ W(!1), _ = /* @__PURE__ */ W(""), v = /* @__PURE__ */ W(!1), y = /* @__PURE__ */ W(!1), b = null, x = null, S = null;
	function C() {
		y.value = document.fullscreenElement === e.value;
	}
	function w() {
		C();
	}
	function T() {
		S = w, document.addEventListener("fullscreenchange", S), C();
	}
	function E() {
		return Su({
			lightDir: r.value,
			renderMode: i.value,
			specularExponent: a.value,
			colorGain: o.value,
			camera: s.value,
			controls: c.value
		});
	}
	function D(e) {
		Cu(e, {
			lightDir: r,
			renderMode: i,
			specularExponent: a,
			colorGain: o,
			camera: s,
			controls: c,
			setRenderMode: u,
			updateSpecular: d,
			updateColorGain: f,
			onApplied: p
		});
	}
	function O() {
		let e = l();
		if (!e) return;
		let t = document.createElement("a");
		t.href = e, t.download = `rti_export_${Date.now()}.png`, t.click();
	}
	function ee() {
		s.value && (_.value = xl(n.value || `${window.location.origin}${window.location.pathname}`, {
			camera: {
				cx: s.value.position.x,
				cy: s.value.position.y,
				zoom: s.value.zoom
			},
			lightDir: {
				x: r.value.x,
				y: r.value.y,
				z: r.value.z
			},
			renderMode: i.value,
			colorGain: o.value
		}), v.value = !1, g.value = !0);
	}
	async function k() {
		try {
			await navigator.clipboard.writeText(_.value), v.value = !0, setTimeout(() => {
				v.value = !1;
			}, 2e3);
		} catch (e) {
			console.error("Failed to copy: ", e), alert("Failed to copy link. Please select the text and copy it manually.");
		}
	}
	function A() {
		if (!document.fullscreenElement) {
			e.value?.requestFullscreen?.().catch((e) => {
				console.warn(`Error attempting to enable fullscreen: ${e.message}`);
			});
			return;
		}
		document.exitFullscreen?.();
	}
	function te() {
		let n = t.value?.sidebarEl, r = e.value;
		if (!n || !r) return;
		let i = n.scrollHeight;
		r.style.minHeight = `${i}px`;
		let a = r.closest("modern-rti-viewer");
		a && (a.style.minHeight = `${i}px`);
	}
	function j() {
		t.value?.sidebarEl && (x = new ResizeObserver(() => te()), x.observe(t.value.sidebarEl));
	}
	function ne() {
		let t = e.value?.closest("modern-rti-viewer");
		t && (b = (e) => {
			let { type: n, ...r } = e.detail || {};
			if (n === "set-annotations") {
				let e = r.annotations || [];
				t._pendingAnnotations = e, m.onSetAnnotations(e);
			} else n === "restore-view" ? D(r.rtiView) : n === "resize" ? m.onResize() : n === "select-annotation" && m.onSelectAnnotation(r.id ?? null);
		}, t.addEventListener("rti-command", b), t._pendingAnnotations?.length && m.onSetAnnotations(t._pendingAnnotations));
	}
	function M() {
		S &&= (document.removeEventListener("fullscreenchange", S), null), b &&= ((e.value?.closest("modern-rti-viewer"))?.removeEventListener("rti-command", b), null), x?.disconnect(), x = null;
	}
	return {
		showInfo: h,
		showShareModal: g,
		generatedShareLink: _,
		isCopied: v,
		isFullscreen: y,
		getCaptureState: E,
		restoreView: D,
		exportImage: O,
		copyLink: ee,
		executeCopyLink: k,
		toggleFullscreen: A,
		syncToolbarMinHeight: te,
		observeSidebarResize: j,
		attachGlobalListeners: T,
		attachHostCommands: ne,
		dispose: M
	};
}
//#endregion
//#region src/composables/useRenderSettings.ts
function Tu(e) {
	let t = /* @__PURE__ */ W(0), n = /* @__PURE__ */ W(10);
	function r(n) {
		t.value = n, e.setRenderModeOnMeshes(n);
	}
	function i() {
		e.updateSpecularOnMeshes();
	}
	function a(e) {
		n.value = e, i();
	}
	return {
		renderMode: t,
		specularExponent: n,
		setRenderMode: r,
		updateSpecular: i,
		onSpecularExponentChange: a
	};
}
//#endregion
//#region src/composables/useRtiViewer.ts
function Eu({ props: e, emit: n, rootWrapper: r, sidebarComponentRef: i, compassComponentRef: a, containerWrapper: o, container: s }) {
	let c = /* @__PURE__ */ W(!0), l = /* @__PURE__ */ W(""), u = /* @__PURE__ */ W("pan"), d = new t(1, 1, 1), f = /* @__PURE__ */ W(new t(0, 0, 1)), p = {
		setRenderModeOnMeshes: () => {},
		updateSpecularOnMeshes: () => {}
	}, { renderMode: m, specularExponent: h, setRenderMode: g, updateSpecular: _, onSpecularExponentChange: v } = Tu(p), y = {
		onFrame() {},
		onResize() {}
	}, b = nu({
		containerWrapper: o,
		container: s,
		url: /* @__PURE__ */ dn(e, "url"),
		lightDir: f,
		renderMode: m,
		specularExponent: h,
		colorGainVector: d,
		getPanEnabled: () => u.value === "pan",
		debug: e.debug === "true",
		onResize: () => y.onResize(),
		onFrame: () => y.onFrame()
	}), { rtiInfo: x, renderer: S, camera: C, controls: w, quadtree: T, fetchRtiInfo: E, initQuadtree: D, init: O, dispose: ee, resize: k, setControlsEnabled: A, updateColorGainOnMeshes: te, applyUrlView: j, exportPng: ne, sampleColorAtScreen: M } = b;
	Object.assign(p, {
		setRenderModeOnMeshes: b.setRenderModeOnMeshes,
		updateSpecularOnMeshes: b.updateSpecularOnMeshes
	});
	let N = () => ({}), P = mu({
		enabled: () => !!e.annotationEnabled,
		currentMode: u,
		renderer: S,
		camera: C,
		quadtree: T,
		onCreate: (e) => n("annotation-create", e),
		onClick: (e) => n("annotation-click", e),
		captureRtiView: () => N()
	}), { overlayShapes: F, overlaySize: re, annotationShape: ie, annotationColor: I, shapeMenuOpen: ae, selectedAnnotationId: oe, activeShapeOption: se, syncOverlaySize: ce, updateOverlayShapes: L, clearDrawingState: le, toggleAnnotateMode: R, selectAnnotationShape: ue, selectAnnotationColor: de, pointerToImageNorm: fe, shapeInteractionClass: pe, onShapeClick: me, onAnnotationPointerDown: he, onAnnotationPointerMove: ge, onAnnotationPointerUp: _e } = P, { colorGain: ve, wbPickFeedback: ye, whiteBalanceActive: be, gainMin: xe, gainMax: Se, updateColorGain: Ce, pick: we, reset: Te, onColorGainUpdate: Ee, clearFeedback: De, applyColorGain: Oe } = xu({
		currentMode: u,
		colorGainVector: d,
		updateColorGainOnMeshes: te,
		pointerToImageNorm: fe,
		sampleColorAtScreen: M
	}), { setMode: ke, toggleWhiteBalanceMode: Ae, setup: je, dispose: Me } = bu({
		currentMode: u,
		lightDir: f,
		container: s,
		getRenderer: () => S.value,
		getCompassEl: () => a.value?.compassEl,
		setControlsEnabled: A,
		onLeaveAnnotate: le,
		onLeaveWhiteBalance: De,
		onWhiteBalancePick: we
	}), { showInfo: Ne, showShareModal: Pe, generatedShareLink: Fe, isCopied: z, isFullscreen: Ie, getCaptureState: Le, exportImage: B, copyLink: Re, executeCopyLink: ze, toggleFullscreen: Be, syncToolbarMinHeight: Ve, observeSidebarResize: He, attachGlobalListeners: Ue, attachHostCommands: We, dispose: Ge } = wu({
		rootWrapper: r,
		sidebarComponentRef: i,
		shareUrl: /* @__PURE__ */ dn(e, "shareUrl"),
		lightDir: f,
		renderMode: m,
		specularExponent: h,
		colorGain: ve,
		camera: C,
		controls: w,
		exportPng: ne,
		setRenderMode: g,
		updateSpecular: _,
		updateColorGain: Ce,
		onViewRestored: L,
		hostHandlers: {
			onSetAnnotations: P.setAnnotations,
			onResize: k,
			onSelectAnnotation: P.selectAnnotation
		}
	});
	N = Le, y.onFrame = () => L(), y.onResize = () => {
		ce(), L();
	};
	let Ke = () => R(ke), qe = (e) => ue(e, ke), Je = !1, Ye = "";
	async function Xe() {
		c.value = !0, l.value = "", Me(), ee(), P.setAnnotations([]), le(), Oe({
			r: 1,
			g: 1,
			b: 1
		}), De(), u.value !== "pan" && ke("pan"), await E(), D();
		let e = j(O());
		e && Oe(e), je(), c.value = !1, await Mn(), ce(), Ve(), L(), r.value && r.value.dispatchEvent(new CustomEvent("rti-loaded", {
			detail: x.value,
			bubbles: !0
		})), n("rti-loaded", x.value);
	}
	async function Ze() {
		try {
			Je = !0, Ye = e.url, await Xe(), We(), He(), Ue();
		} catch (e) {
			l.value = e instanceof Error ? e.message : String(e), c.value = !1;
		}
	}
	async function Qe(e) {
		if (!(!Je || !e || e === Ye)) {
			Ye = e;
			try {
				await Xe();
			} catch (e) {
				l.value = e instanceof Error ? e.message : String(e), c.value = !1;
			}
		}
	}
	function $e() {
		Je = !1, Ye = "", Ge(), Me(), ee();
	}
	function et(e) {
		!e && u.value === "annotate" && ke("pan"), e && Mn(ce);
	}
	return {
		loading: c,
		error: l,
		currentMode: u,
		lightDir: f,
		rtiInfo: x,
		renderMode: m,
		specularExponent: h,
		setRenderMode: g,
		onSpecularExponentChange: v,
		overlayShapes: F,
		overlaySize: re,
		annotationShape: ie,
		annotationColor: I,
		shapeMenuOpen: ae,
		selectedAnnotationId: oe,
		activeShapeOption: se,
		shapeInteractionClass: pe,
		onShapeClick: me,
		onAnnotationPointerDown: he,
		onAnnotationPointerMove: ge,
		onAnnotationPointerUp: _e,
		selectAnnotationColor: de,
		toggleAnnotateMode: Ke,
		selectAnnotationShape: qe,
		toggleWhiteBalanceMode: Ae,
		colorGain: ve,
		wbPickFeedback: ye,
		whiteBalanceActive: be,
		gainMin: xe,
		gainMax: Se,
		onColorGainUpdate: Ee,
		resetWhiteBalance: Te,
		showInfo: Ne,
		showShareModal: Pe,
		generatedShareLink: Fe,
		isCopied: z,
		isFullscreen: Ie,
		exportImage: B,
		copyLink: Re,
		executeCopyLink: ze,
		toggleFullscreen: Be,
		setMode: ke,
		mount: Ze,
		unmount: $e,
		onAnnotationEnabledChange: et,
		onUrlChange: Qe
	};
}
//#endregion
//#region src/components/RtiViewer.vue?vue&type=script&setup=true&lang.ts
var Du = {
	key: 0,
	class: "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10"
}, Ou = {
	key: 1,
	class: "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-20 px-6 text-center"
}, ku = { class: "text-slate-300 text-sm max-w-md" }, Au = /* @__PURE__ */ _r({
	__name: "RtiViewer",
	props: {
		url: {
			type: String,
			required: !0,
			default: "/mock"
		},
		shareUrl: {
			type: String,
			required: !1,
			default: ""
		},
		debug: {
			type: String,
			required: !1,
			default: "false"
		},
		annotationEnabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"annotation-create",
		"rti-loaded",
		"annotation-click"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ W(null), a = /* @__PURE__ */ W(null), o = /* @__PURE__ */ W(null), s = /* @__PURE__ */ W(null), c = /* @__PURE__ */ W(null), { loading: l, error: u, currentMode: d, lightDir: f, rtiInfo: p, renderMode: m, specularExponent: h, setRenderMode: g, onSpecularExponentChange: _, overlayShapes: v, overlaySize: y, annotationShape: b, annotationColor: x, shapeMenuOpen: S, selectedAnnotationId: C, activeShapeOption: w, shapeInteractionClass: T, onShapeClick: E, onAnnotationPointerDown: D, onAnnotationPointerMove: O, onAnnotationPointerUp: ee, selectAnnotationColor: k, toggleAnnotateMode: A, selectAnnotationShape: te, toggleWhiteBalanceMode: j, colorGain: ne, wbPickFeedback: M, whiteBalanceActive: N, gainMin: P, gainMax: F, onColorGainUpdate: re, resetWhiteBalance: ie, showInfo: I, showShareModal: ae, generatedShareLink: oe, isCopied: se, isFullscreen: ce, exportImage: L, copyLink: le, executeCopyLink: R, toggleFullscreen: ue, setMode: de, mount: fe, unmount: pe, onAnnotationEnabledChange: me, onUrlChange: he } = Eu({
			props: n,
			emit: r,
			rootWrapper: i,
			sidebarComponentRef: a,
			compassComponentRef: o,
			containerWrapper: s,
			container: c
		});
		return Mr(fe), Fr(pe), Xn(() => n.annotationEnabled, me), Xn(() => n.url, he), (t, n) => (q(), J("div", {
			ref_key: "rootWrapper",
			ref: i,
			class: "relative flex flex-row w-full h-full min-h-[49rem] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700"
		}, [
			X(bc, {
				ref_key: "sidebarComponentRef",
				ref: a,
				"current-mode": G(d),
				"render-mode": G(m),
				"specular-exponent": G(h),
				"annotation-enabled": e.annotationEnabled,
				"annotation-shape": G(b),
				"annotation-color": G(x),
				"shape-menu-open": G(S),
				"active-shape-hint": G(w).hint,
				"rti-type": G(p)?.type,
				"is-fullscreen": G(ce),
				"info-open": G(I),
				onSetMode: G(de),
				onToggleAnnotate: G(A),
				onSelectAnnotationShape: G(te),
				onSelectAnnotationColor: G(k),
				onToggleWhiteBalance: G(j),
				onSetRenderMode: G(g),
				"onUpdate:specularExponent": G(_),
				onToggleFullscreen: G(ue),
				onExportImage: G(L),
				onCopyLink: G(le),
				onToggleInfo: n[0] ||= (e) => I.value = !G(I)
			}, null, 8, [
				"current-mode",
				"render-mode",
				"specular-exponent",
				"annotation-enabled",
				"annotation-shape",
				"annotation-color",
				"shape-menu-open",
				"active-shape-hint",
				"rti-type",
				"is-fullscreen",
				"info-open",
				"onSetMode",
				"onToggleAnnotate",
				"onSelectAnnotationShape",
				"onSelectAnnotationColor",
				"onToggleWhiteBalance",
				"onSetRenderMode",
				"onUpdate:specularExponent",
				"onToggleFullscreen",
				"onExportImage",
				"onCopyLink"
			]),
			X(Ec, {
				open: G(I),
				onClose: n[1] ||= (e) => I.value = !1
			}, null, 8, ["open"]),
			X(jc, {
				open: G(ae),
				"share-link": G(oe),
				copied: G(se),
				onClose: n[2] ||= (e) => ae.value = !1,
				onCopy: G(R)
			}, null, 8, [
				"open",
				"share-link",
				"copied",
				"onCopy"
			]),
			Y("div", {
				class: "flex-1 relative overflow-hidden",
				ref_key: "containerWrapper",
				ref: s
			}, [
				Y("div", {
					ref_key: "container",
					ref: c,
					class: "absolute inset-0"
				}, null, 512),
				X(Xc, {
					visible: e.annotationEnabled && !G(l),
					interactive: G(d) === "annotate",
					shapes: G(v),
					"overlay-size": G(y),
					"selected-id": G(C),
					"interaction-class": G(T),
					onPointerdown: G(D),
					onPointermove: G(O),
					onPointerup: G(ee),
					onShapeClick: G(E)
				}, null, 8, [
					"visible",
					"interactive",
					"shapes",
					"overlay-size",
					"selected-id",
					"interaction-class",
					"onPointerdown",
					"onPointermove",
					"onPointerup",
					"onShapeClick"
				]),
				G(l) && !G(u) ? (q(), J("div", Du, [...n[3] ||= [Y("div", { class: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" }, null, -1), Y("p", { class: "text-white font-medium" }, "Loading RTI Data...", -1)]])) : wa("", !0),
				G(u) ? (q(), J("div", Ou, [n[4] ||= Y("p", { class: "text-red-400 font-semibold text-lg mb-2" }, "Failed to load RTI", -1), Y("p", ku, Ne(G(u)), 1)])) : wa("", !0),
				X(Rc, {
					"current-mode": G(d),
					loading: G(l),
					"white-balance-active": G(N),
					"color-gain": G(ne),
					"gain-min": G(P),
					"gain-max": G(F),
					"pick-feedback": G(M),
					"onUpdate:colorGain": G(re),
					onReset: G(ie)
				}, null, 8, [
					"current-mode",
					"loading",
					"white-balance-active",
					"color-gain",
					"gain-min",
					"gain-max",
					"pick-feedback",
					"onUpdate:colorGain",
					"onReset"
				]),
				X(zc, {
					ref_key: "compassComponentRef",
					ref: o,
					"light-dir": G(f)
				}, null, 8, ["light-dir"])
			], 512)
		], 512));
	}
});
//#endregion
//#region src/lib/webComponentAttrs.ts
function ju(e) {
	return e === !0 ? !0 : e === !1 || e == null ? !1 : e === "true" || e === "";
}
//#endregion
//#region src/lib/modernRtiViewerElement.ts
var Mu = class extends HTMLElement {
	_pendingAnnotations = [];
	mountPoint;
	app;
	_setUrl;
	_setShareUrl;
	_setAnnotationEnabled;
	static get observedAttributes() {
		return [
			"url",
			"share-url",
			"annotation-enabled"
		];
	}
	connectedCallback() {
		let e = this;
		e._pendingAnnotations = e._pendingAnnotations || [], this.mountPoint = document.createElement("div"), this.mountPoint.style.width = "100%", this.mountPoint.style.height = "100%", this.appendChild(this.mountPoint), this.app = fs({ setup() {
			let t = /* @__PURE__ */ W(e.getAttribute("url") || ""), n = /* @__PURE__ */ W(e.getAttribute("share-url") || ""), r = /* @__PURE__ */ W(ju(e.getAttribute("annotation-enabled")));
			return e._setUrl = (e) => {
				t.value = e ?? "";
			}, e._setShareUrl = (e) => {
				n.value = e ?? "";
			}, e._setAnnotationEnabled = (e) => {
				r.value = e;
			}, () => $a(Au, {
				url: t.value,
				shareUrl: n.value,
				annotationEnabled: r.value,
				onAnnotationCreate(t) {
					e.dispatchEvent(new CustomEvent("annotation-create", {
						detail: t,
						bubbles: !0
					}));
				},
				onRtiLoaded(t) {
					e.dispatchEvent(new CustomEvent("rti-loaded", {
						detail: t,
						bubbles: !0
					}));
				},
				onAnnotationClick(t) {
					e.dispatchEvent(new CustomEvent("annotation-click", {
						detail: t,
						bubbles: !0
					}));
				}
			});
		} }), this.app.mount(this.mountPoint);
	}
	attributeChangedCallback(e, t, n) {
		if (e === "url") {
			this._setUrl?.(n);
			return;
		}
		if (e === "share-url") {
			this._setShareUrl?.(n);
			return;
		}
		e === "annotation-enabled" && this._setAnnotationEnabled?.(ju(n));
	}
	disconnectedCallback() {
		this.app &&= (this.app.unmount(), null), this._setUrl = void 0, this._setShareUrl = void 0, this._setAnnotationEnabled = void 0;
	}
};
function Nu() {
	customElements.get("modern-rti-viewer") || customElements.define("modern-rti-viewer", Mu);
}
//#endregion
//#region src/lib.ts
Nu();
//#endregion
export { Mu as ModernRtiViewerElement, Au as RtiViewer, ju as parseAnnotationEnabledAttr, Nu as registerModernRtiViewerElement };
