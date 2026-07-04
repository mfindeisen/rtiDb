import { a as e, c as t, i as n, l as r, o as i, s as a, t as o, u as s } from "./globals-BVy3xBne.js";
//#region node_modules/.pnpm/@vue+shared@3.5.39/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function c(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var l = {}, u = [], d = () => {}, f = () => !1, p = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), m = (e) => e.startsWith("onUpdate:"), h = Object.assign, g = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, _ = Object.prototype.hasOwnProperty, v = (e, t) => _.call(e, t), y = Array.isArray, b = (e) => k(e) === "[object Map]", x = (e) => k(e) === "[object Set]", S = (e) => k(e) === "[object Date]", C = (e) => typeof e == "function", w = (e) => typeof e == "string", T = (e) => typeof e == "symbol", E = (e) => typeof e == "object" && !!e, D = (e) => (E(e) || C(e)) && C(e.then) && C(e.catch), O = Object.prototype.toString, k = (e) => O.call(e), A = (e) => k(e).slice(8, -1), ee = (e) => k(e) === "[object Object]", te = (e) => w(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, j = /* @__PURE__ */ c(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ne = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, M = /-\w/g, N = ne((e) => e.replace(M, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, ie = ne((e) => e.replace(re, "-$1").toLowerCase()), ae = ne((e) => e.charAt(0).toUpperCase() + e.slice(1)), oe = ne((e) => e ? `on${ae(e)}` : ""), P = (e, t) => !Object.is(e, t), se = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, F = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ce = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, le = (e) => {
	let t = w(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ue, de = () => ue ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function fe(e) {
	if (y(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = w(r) ? ge(r) : fe(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (w(e) || E(e)) return e;
}
var pe = /;(?![^(]*\))/g, me = /:([^]+)/, he = /\/\*[^]*?\*\//g;
function ge(e) {
	let t = {};
	return e.replace(he, "").split(pe).forEach((e) => {
		if (e) {
			let n = e.split(me);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function _e(e) {
	let t = "";
	if (w(e)) t = e;
	else if (y(e)) for (let n = 0; n < e.length; n++) {
		let r = _e(e[n]);
		r && (t += r + " ");
	}
	else if (E(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var ve = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ye = /* @__PURE__ */ c(ve);
ve + "";
function be(e) {
	return !!e || e === "";
}
function xe(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = I(e[r], t[r]);
	return n;
}
function I(e, t) {
	if (e === t) return !0;
	let n = S(e), r = S(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = T(e), r = T(t), n || r) return e === t;
	if (n = y(e), r = y(t), n || r) return n && r ? xe(e, t) : !1;
	if (n = E(e), r = E(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !I(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
var Se = (e) => !!(e && e.__v_isRef === !0), Ce = (e) => w(e) ? e : e == null ? "" : y(e) || E(e) && (e.toString === O || !C(e.toString)) ? Se(e) ? Ce(e.value) : JSON.stringify(e, we, 2) : String(e), we = (e, t) => Se(t) ? we(e, t.value) : b(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[L(t, r) + " =>"] = n, e), {}) } : x(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => L(e)) } : T(t) ? L(t) : E(t) && !y(t) && !ee(t) ? String(t) : t, L = (e, t = "") => T(e) ? `Symbol(${e.description ?? t})` : e, Te, R = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Te && (Te.active ? (this.parent = Te, this.index = (Te.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = Te;
			try {
				return Te = this, e();
			} finally {
				Te = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Te, Te = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Te === this) Te = this.prevScope;
			else {
				let e = Te;
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
function z() {
	return Te;
}
var B, Ee = /* @__PURE__ */ new WeakSet(), De = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Te && (Te.active ? Te.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Ee.has(this) && (Ee.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || je(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ue(this), Pe(this);
		let e = B, t = Be;
		B = this, Be = !0;
		try {
			return this.fn();
		} finally {
			Fe(this), B = e, Be = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Re(e);
			this.deps = this.depsTail = void 0, Ue(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Ee.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ie(this) && this.run();
	}
	get dirty() {
		return Ie(this);
	}
}, Oe = 0, ke, Ae;
function je(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ae, Ae = e;
		return;
	}
	e.next = ke, ke = e;
}
function Me() {
	Oe++;
}
function Ne() {
	if (--Oe > 0) return;
	if (Ae) {
		let e = Ae;
		for (Ae = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ke;) {
		let t = ke;
		for (ke = void 0; t;) {
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
function Pe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Fe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Re(r), ze(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Le(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Le(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === We) || (e.globalVersion = We, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ie(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = B, r = Be;
	B = e, Be = !0;
	try {
		Pe(e);
		let n = e.fn(e._value);
		(t.version === 0 || P(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		B = n, Be = r, Fe(e), e.flags &= -3;
	}
}
function Re(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Re(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function ze(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Be = !0, Ve = [];
function He() {
	Ve.push(Be), Be = !1;
}
function V() {
	let e = Ve.pop();
	Be = e === void 0 ? !0 : e;
}
function Ue(e) {
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
var We = 0, Ge = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ke = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!B || !Be || B === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== B) t = this.activeLink = new Ge(B, this), B.deps ? (t.prevDep = B.depsTail, B.depsTail.nextDep = t, B.depsTail = t) : B.deps = B.depsTail = t, qe(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = B.depsTail, t.nextDep = void 0, B.depsTail.nextDep = t, B.depsTail = t, B.deps === t && (B.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, We++, this.notify(e);
	}
	notify(e) {
		Me();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ne();
		}
	}
};
function qe(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) qe(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Je = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ Symbol(""), Xe = /* @__PURE__ */ Symbol(""), Ze = /* @__PURE__ */ Symbol("");
function Qe(e, t, n) {
	if (Be && B) {
		let t = Je.get(e);
		t || Je.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ke()), r.map = t, r.key = n), r.track();
	}
}
function $e(e, t, n, r, i, a) {
	let o = Je.get(e);
	if (!o) {
		We++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Me(), t === "clear") o.forEach(s);
	else {
		let i = y(e), a = i && te(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Ze || !T(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Ze)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ye)), b(e) && s(o.get(Xe)));
				break;
			case "delete":
				i || (s(o.get(Ye)), b(e) && s(o.get(Xe)));
				break;
			case "set":
				b(e) && s(o.get(Ye));
				break;
		}
	}
	Ne();
}
function et(e) {
	let t = /* @__PURE__ */ H(e);
	return t === e ? t : (Qe(t, "iterate", Ze), /* @__PURE__ */ zt(e) ? t : t.map(Ht));
}
function tt(e) {
	return Qe(e = /* @__PURE__ */ H(e), "iterate", Ze), e;
}
function nt(e, t) {
	return /* @__PURE__ */ Rt(e) ? Ut(/* @__PURE__ */ Lt(e) ? Ht(t) : t) : Ht(t);
}
var rt = {
	__proto__: null,
	[Symbol.iterator]() {
		return it(this, Symbol.iterator, (e) => nt(this, e));
	},
	concat(...e) {
		return et(this).concat(...e.map((e) => y(e) ? et(e) : e));
	},
	entries() {
		return it(this, "entries", (e) => (e[1] = nt(this, e[1]), e));
	},
	every(e, t) {
		return ot(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return ot(this, "filter", e, t, (e) => e.map((e) => nt(this, e)), arguments);
	},
	find(e, t) {
		return ot(this, "find", e, t, (e) => nt(this, e), arguments);
	},
	findIndex(e, t) {
		return ot(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return ot(this, "findLast", e, t, (e) => nt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return ot(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return ot(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return ct(this, "includes", e);
	},
	indexOf(...e) {
		return ct(this, "indexOf", e);
	},
	join(e) {
		return et(this).join(e);
	},
	lastIndexOf(...e) {
		return ct(this, "lastIndexOf", e);
	},
	map(e, t) {
		return ot(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return lt(this, "pop");
	},
	push(...e) {
		return lt(this, "push", e);
	},
	reduce(e, ...t) {
		return st(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return st(this, "reduceRight", e, t);
	},
	shift() {
		return lt(this, "shift");
	},
	some(e, t) {
		return ot(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return lt(this, "splice", e);
	},
	toReversed() {
		return et(this).toReversed();
	},
	toSorted(e) {
		return et(this).toSorted(e);
	},
	toSpliced(...e) {
		return et(this).toSpliced(...e);
	},
	unshift(...e) {
		return lt(this, "unshift", e);
	},
	values() {
		return it(this, "values", (e) => nt(this, e));
	}
};
function it(e, t, n) {
	let r = tt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ zt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var at = Array.prototype;
function ot(e, t, n, r, i, a) {
	let o = tt(e), s = o !== e && !/* @__PURE__ */ zt(e), c = o[t];
	if (c !== at[t]) {
		let t = c.apply(e, a);
		return s ? Ht(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, nt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function st(e, t, n, r) {
	let i = tt(e), a = i !== e && !/* @__PURE__ */ zt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = nt(e, t)), n.call(this, t, nt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? nt(e, c) : c;
}
function ct(e, t, n) {
	let r = /* @__PURE__ */ H(e);
	Qe(r, "iterate", Ze);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Bt(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), r[t](...n)) : i;
}
function lt(e, t, n = []) {
	He(), Me();
	let r = (/* @__PURE__ */ H(e))[t].apply(e, n);
	return Ne(), V(), r;
}
var ut = /* @__PURE__ */ c("__proto__,__v_isRef,__isVue"), dt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(T));
function ft(e) {
	T(e) || (e = String(e));
	let t = /* @__PURE__ */ H(this);
	return Qe(t, "has", e), t.hasOwnProperty(e);
}
var pt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? jt : At : i ? kt : Ot).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = y(e);
		if (!r) {
			let e;
			if (a && (e = rt[t])) return e;
			if (t === "hasOwnProperty") return ft;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ Wt(e) ? e : n);
		if ((T(t) ? dt.has(t) : ut(t)) || (r || Qe(e, "get", t), i)) return o;
		if (/* @__PURE__ */ Wt(o)) {
			let e = a && te(t) ? o : o.value;
			return r && E(e) ? /* @__PURE__ */ Ft(e) : e;
		}
		return E(o) ? r ? /* @__PURE__ */ Ft(o) : /* @__PURE__ */ Nt(o) : o;
	}
}, mt = class extends pt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = y(e) && te(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Rt(i);
			if (!/* @__PURE__ */ zt(n) && !/* @__PURE__ */ Rt(n) && (i = /* @__PURE__ */ H(i), n = /* @__PURE__ */ H(n)), !a && /* @__PURE__ */ Wt(i) && !/* @__PURE__ */ Wt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : v(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ Wt(e) ? e : r);
		return e === /* @__PURE__ */ H(r) && s && (o ? P(n, i) && $e(e, "set", t, n, i) : $e(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = v(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && $e(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!T(t) || !dt.has(t)) && Qe(e, "has", t), n;
	}
	ownKeys(e) {
		return Qe(e, "iterate", y(e) ? "length" : Ye), Reflect.ownKeys(e);
	}
}, ht = class extends pt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, gt = /* @__PURE__ */ new mt(), _t = /* @__PURE__ */ new ht(), vt = /* @__PURE__ */ new mt(!0), yt = (e) => e, bt = (e) => Reflect.getPrototypeOf(e);
function xt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ H(i), o = b(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? yt : t ? Ut : Ht;
		return !t && Qe(a, "iterate", c ? Xe : Ye), h(Object.create(l), { next() {
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
function St(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Ct(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ H(r), a = /* @__PURE__ */ H(n);
			e || (P(n, a) && Qe(i, "get", n), Qe(i, "get", a));
			let { has: o } = bt(i), s = t ? yt : e ? Ut : Ht;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && Qe(/* @__PURE__ */ H(t), "iterate", Ye), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ H(n), i = /* @__PURE__ */ H(t);
			return e || (P(t, i) && Qe(r, "has", t), Qe(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ H(a), s = t ? yt : e ? Ut : Ht;
			return !e && Qe(o, "iterate", Ye), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return h(n, e ? {
		add: St("add"),
		set: St("set"),
		delete: St("delete"),
		clear: St("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ H(this), r = bt(n), i = /* @__PURE__ */ H(e), a = !t && !/* @__PURE__ */ zt(e) && !/* @__PURE__ */ Rt(e) ? i : e;
			return r.has.call(n, a) || P(e, a) && r.has.call(n, e) || P(i, a) && r.has.call(n, i) || (n.add(a), $e(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ zt(n) && !/* @__PURE__ */ Rt(n) && (n = /* @__PURE__ */ H(n));
			let r = /* @__PURE__ */ H(this), { has: i, get: a } = bt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ H(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? P(n, s) && $e(r, "set", e, n, s) : $e(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ H(this), { has: n, get: r } = bt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ H(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && $e(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ H(this), t = e.size !== 0, n = e.clear();
			return t && $e(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = xt(r, e, t);
	}), n;
}
function wt(e, t) {
	let n = Ct(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(v(n, r) && r in t ? n : t, r, i);
}
var Tt = { get: /* @__PURE__ */ wt(!1, !1) }, Et = { get: /* @__PURE__ */ wt(!1, !0) }, Dt = { get: /* @__PURE__ */ wt(!0, !1) }, Ot = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap();
function Mt(e) {
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
function Nt(e) {
	return /* @__PURE__ */ Rt(e) ? e : It(e, !1, gt, Tt, Ot);
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
	return It(e, !1, vt, Et, kt);
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
	return It(e, !0, _t, Dt, At);
}
function It(e, t, n, r, i) {
	if (!E(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Mt(A(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return /* @__PURE__ */ Rt(e) ? /* @__PURE__ */ Lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ H(t) : e;
}
function Vt(e) {
	return !v(e, "__v_skip") && Object.isExtensible(e) && F(e, "__v_skip", !0), e;
}
var Ht = (e) => E(e) ? /* @__PURE__ */ Nt(e) : e, Ut = (e) => E(e) ? /* @__PURE__ */ Ft(e) : e;
// @__NO_SIDE_EFFECTS__
function Wt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return qt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return qt(e, !0);
}
function qt(e, t) {
	return /* @__PURE__ */ Wt(e) ? e : new Jt(e, t);
}
var Jt = class {
	constructor(e, t) {
		this.dep = new Ke(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ H(e), this._value = t ? e : Ht(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ zt(e) || /* @__PURE__ */ Rt(e);
		e = n ? e : /* @__PURE__ */ H(e), P(e, t) && (this._rawValue = e, this._value = n ? e : Ht(e), this.dep.trigger());
	}
};
function Yt(e) {
	return /* @__PURE__ */ Wt(e) ? e.value : e;
}
var Xt = {
	get: (e, t, n) => t === "__v_raw" ? e : Yt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ Wt(i) && !/* @__PURE__ */ Wt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Zt(e) {
	return /* @__PURE__ */ Lt(e) ? e : new Proxy(e, Xt);
}
var Qt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ke(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = We - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && B !== this) return je(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Le(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function $t(e, t, n = !1) {
	let r, i;
	return C(e) ? r = e : (r = e.get, i = e.set), new Qt(r, i, n);
}
var en = {}, tn = /* @__PURE__ */ new WeakMap(), nn = void 0;
function rn(e, t = !1, n = nn) {
	if (n) {
		let t = tn.get(n);
		t || tn.set(n, t = []), t.push(e);
	}
}
function an(e, t, n = l) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, u = (e) => i ? e : /* @__PURE__ */ zt(e) || i === !1 || i === 0 ? on(e, 1) : on(e), f, p, m, h, _ = !1, v = !1;
	if (/* @__PURE__ */ Wt(e) ? (p = () => e.value, _ = /* @__PURE__ */ zt(e)) : /* @__PURE__ */ Lt(e) ? (p = () => u(e), _ = !0) : y(e) ? (v = !0, _ = e.some((e) => /* @__PURE__ */ Lt(e) || /* @__PURE__ */ zt(e)), p = () => e.map((e) => {
		if (/* @__PURE__ */ Wt(e)) return e.value;
		if (/* @__PURE__ */ Lt(e)) return u(e);
		if (C(e)) return c ? c(e, 2) : e();
	})) : p = C(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (m) {
			He();
			try {
				m();
			} finally {
				V();
			}
		}
		let t = nn;
		nn = f;
		try {
			return c ? c(e, 3, [h]) : e(h);
		} finally {
			nn = t;
		}
	} : d, t && i) {
		let e = p, t = i === !0 ? Infinity : i;
		p = () => on(e(), t);
	}
	let b = z(), x = () => {
		f.stop(), b && b.active && g(b.effects, f);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return x(), n;
		};
	}
	let S = v ? Array(e.length).fill(en) : en, w = (e) => {
		if (!(!(f.flags & 1) || !f.dirty && !e)) if (t) {
			let n = f.run();
			if (e || i || _ || (v ? n.some((e, t) => P(e, S[t])) : P(n, S))) {
				m && m();
				let e = nn;
				nn = f;
				try {
					let e = [
						n,
						S === en ? void 0 : v && S[0] === en ? [] : S,
						h
					];
					S = n, c ? c(t, 3, e) : t(...e);
				} finally {
					nn = e;
				}
			}
		} else f.run();
	};
	return s && s(w), f = new De(p), f.scheduler = o ? () => o(w, !1) : w, h = (e) => rn(e, !1, f), m = f.onStop = () => {
		let e = tn.get(f);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			tn.delete(f);
		}
	}, t ? r ? w(!0) : S = f.run() : o ? o(w.bind(null, !0), !0) : f.run(), x.pause = f.pause.bind(f), x.resume = f.resume.bind(f), x.stop = x, x;
}
function on(e, t = Infinity, n) {
	if (t <= 0 || !E(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ Wt(e)) on(e.value, t, n);
	else if (y(e)) for (let r = 0; r < e.length; r++) on(e[r], t, n);
	else if (x(e) || b(e)) e.forEach((e) => {
		on(e, t, n);
	});
	else if (ee(e)) {
		for (let r in e) on(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && on(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/@vue+runtime-core@3.5.39/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function sn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		ln(e, t, n);
	}
}
function cn(e, t, n, r) {
	if (C(e)) {
		let i = sn(e, t, n, r);
		return i && D(i) && i.catch((e) => {
			ln(e, t, n);
		}), i;
	}
	if (y(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(cn(e[a], t, n, r));
		return i;
	}
}
function ln(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || l;
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
			He(), sn(a, null, 10, [
				e,
				i,
				o
			]), V();
			return;
		}
	}
	un(e, n, i, r, o);
}
function un(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var dn = [], fn = -1, pn = [], mn = null, hn = 0, gn = /* @__PURE__ */ Promise.resolve(), _n = null;
function vn(e) {
	let t = _n || gn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function yn(e) {
	let t = fn + 1, n = dn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = dn[r], a = Tn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function bn(e) {
	if (!(e.flags & 1)) {
		let t = Tn(e), n = dn[dn.length - 1];
		!n || !(e.flags & 2) && t >= Tn(n) ? dn.push(e) : dn.splice(yn(t), 0, e), e.flags |= 1, xn();
	}
}
function xn() {
	_n ||= gn.then(En);
}
function Sn(e) {
	y(e) ? pn.push(...e) : mn && e.id === -1 ? mn.splice(hn + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1), xn();
}
function Cn(e, t, n = fn + 1) {
	for (; n < dn.length; n++) {
		let t = dn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			dn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function wn(e) {
	if (pn.length) {
		let e = [...new Set(pn)].sort((e, t) => Tn(e) - Tn(t));
		if (pn.length = 0, mn) {
			mn.push(...e);
			return;
		}
		for (mn = e, hn = 0; hn < mn.length; hn++) {
			let e = mn[hn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		mn = null, hn = 0;
	}
}
var Tn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function En(e) {
	try {
		for (fn = 0; fn < dn.length; fn++) {
			let e = dn[fn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), sn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; fn < dn.length; fn++) {
			let e = dn[fn];
			e && (e.flags &= -2);
		}
		fn = -1, dn.length = 0, wn(e), _n = null, (dn.length || pn.length) && En(e);
	}
}
var Dn = null, On = null;
function kn(e) {
	let t = Dn;
	return Dn = e, On = e && e.type.__scopeId || null, t;
}
function An(e, t = Dn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ea(-1);
		let i = kn(t), a;
		try {
			a = e(...n);
		} finally {
			kn(i), r._d && ea(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function jn(e, t) {
	if (Dn === null) return e;
	let n = Ra(Dn), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = l] = t[e];
		i && (C(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && on(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function Mn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (He(), cn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), V());
	}
}
function Nn(e, t) {
	if (Sa) {
		let n = Sa.provides, r = Sa.parent && Sa.parent.provides;
		r === n && (n = Sa.provides = Object.create(r)), n[e] = t;
	}
}
function Pn(e, t, n = !1) {
	let r = Ca();
	if (r || ti) {
		let i = ti ? ti._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && C(t) ? t.call(r && r.proxy) : t;
	}
}
var Fn = /* @__PURE__ */ Symbol.for("v-scx"), In = () => Pn(Fn);
function Ln(e, t, n) {
	return Rn(e, t, n);
}
function Rn(e, t, n = l) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = h({}, n), c = t && r || !t && a !== "post", u;
	if (ka) {
		if (a === "sync") {
			let e = In();
			u = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = d, e.resume = d, e.pause = d, e;
		}
	}
	let f = Sa;
	s.call = (e, t, n) => cn(e, f, t, n);
	let p = !1;
	a === "post" ? s.scheduler = (e) => {
		Mi(e, f && f.suspense);
	} : a !== "sync" && (p = !0, s.scheduler = (e, t) => {
		t ? e() : bn(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), p && (e.flags |= 2, f && (e.id = f.uid, e.i = f));
	};
	let m = an(e, t, s);
	return ka && (u ? u.push(m) : c && m()), m;
}
function zn(e, t, n) {
	let r = this.proxy, i = w(e) ? e.includes(".") ? Bn(r, e) : () => r[e] : e.bind(r, r), a;
	C(t) ? a = t : (a = t.handler, n = t);
	let o = Ea(this), s = Rn(i, a.bind(r), n);
	return o(), s;
}
function Bn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Vn = /* @__PURE__ */ Symbol("_vte"), Hn = (e) => e.__isTeleport, Un = /* @__PURE__ */ Symbol("_leaveCb"), Wn = /* @__PURE__ */ Symbol("_enterCb");
function Gn() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return vr(() => {
		e.isMounted = !0;
	}), xr(() => {
		e.isUnmounting = !0;
	}), e;
}
var Kn = [Function, Array], qn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Kn,
	onEnter: Kn,
	onAfterEnter: Kn,
	onEnterCancelled: Kn,
	onBeforeLeave: Kn,
	onLeave: Kn,
	onAfterLeave: Kn,
	onLeaveCancelled: Kn,
	onBeforeAppear: Kn,
	onAppear: Kn,
	onAfterAppear: Kn,
	onAppearCancelled: Kn
}, Jn = (e) => {
	let t = e.subTree;
	return t.component ? Jn(t.component) : t;
}, Yn = {
	name: "BaseTransition",
	props: qn,
	setup(e, { slots: t }) {
		let n = Ca(), r = Gn();
		return () => {
			let i = t.default && rr(t.default(), !0), a = i && i.length ? Xn(i) : n.subTree ? pa() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ H(e), { mode: s } = o;
			if (r.isLeaving) return er(a);
			let c = tr(a);
			if (!c) return er(a);
			let l = $n(c, o, r, n, (e) => l = e);
			c.type !== qi && nr(c, l);
			let u = n.subTree && tr(n.subTree);
			if (u && u.type !== qi && !aa(u, c) && Jn(n).type !== qi) {
				let e = $n(u, o, r, n);
				if (nr(u, e), s === "out-in" && c.type !== qi) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, er(a);
				s === "in-out" && c.type !== qi ? e.delayLeave = (e, t, n) => {
					let i = Qn(r, u);
					i[String(u.key)] = u, e[Un] = () => {
						t(), e[Un] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Xn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== qi) {
			t = n;
			break;
		}
	}
	return t;
}
var Zn = Yn;
function Qn(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function $n(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: p, onAfterLeave: m, onLeaveCancelled: h, onBeforeAppear: g, onAppear: _, onAfterAppear: v, onAppearCancelled: b } = t, x = String(e.key), S = Qn(n, e), C = (e, t) => {
		e && cn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), y(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = g || c;
			else return;
			t[Un] && t[Un](!0);
			let i = S[x];
			i && aa(e, i) && i.el[Un] && i.el[Un](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) if (a) r = _ || l, i = v || u, o = b || d;
			else return;
			let s = !1;
			t[Wn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Wn] = void 0);
			};
			let c = t[Wn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Wn] && t[Wn](!0), n.isUnmounting) return r();
			C(f, [t]);
			let a = !1;
			t[Un] = (n) => {
				a || (a = !0, r(), C(n ? h : m, [t]), t[Un] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Un].bind(null, !1);
			S[i] = e, p ? w(p, [t, o]) : o();
		},
		clone(e) {
			let a = $n(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function er(e) {
	if (ur(e)) return e = da(e), e.children = null, e;
}
function tr(e) {
	if (!ur(e)) return Hn(e.type) && e.children ? Xn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && C(n.default)) return n.default();
	}
}
function nr(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, nr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function rr(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === Gi ? (o.patchFlag & 128 && i++, r = r.concat(rr(o.children, t, s))) : (t || o.type !== qi) && r.push(s == null ? o : da(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
function ir(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function ar(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var or = /* @__PURE__ */ new WeakMap();
function sr(e, t, n, r, i = !1) {
	if (y(e)) {
		e.forEach((e, a) => sr(e, t && (y(t) ? t[a] : t), n, r, i));
		return;
	}
	if (lr(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && sr(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Ra(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, u = t && t.r, d = s.refs === l ? s.refs = {} : s.refs, p = s.setupState, m = /* @__PURE__ */ H(p), h = p === l ? f : (e) => ar(d, e) ? !1 : v(m, e), _ = (e, t) => !(t && ar(d, t));
	if (u != null && u !== c) {
		if (cr(t), w(u)) d[u] = null, h(u) && (p[u] = null);
		else if (/* @__PURE__ */ Wt(u)) {
			let e = t;
			_(u, e.k) && (u.value = null), e.k && (d[e.k] = null);
		}
	}
	if (C(c)) {
		He();
		try {
			sn(c, s, 12, [o, d]);
		} finally {
			V();
		}
	} else {
		let t = w(c), r = /* @__PURE__ */ Wt(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? h(c) ? p[c] : d[c] : _(c) || !e.k ? c.value : d[e.k];
					if (i) y(n) && g(n, a);
					else if (y(n)) n.includes(a) || n.push(a);
					else if (t) d[c] = [a], h(c) && (p[c] = d[c]);
					else {
						let t = [a];
						_(c, e.k) && (c.value = t), e.k && (d[e.k] = t);
					}
				} else t ? (d[c] = o, h(c) && (p[c] = o)) : r && (_(c, e.k) && (c.value = o), e.k && (d[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), or.delete(e);
				};
				t.id = -1, or.set(e, t), Mi(t, n);
			} else cr(e), s();
		}
	}
}
function cr(e) {
	let t = or.get(e);
	t && (t.flags |= 8, or.delete(e));
}
de().requestIdleCallback, de().cancelIdleCallback;
var lr = (e) => !!e.type.__asyncLoader, ur = (e) => e.type.__isKeepAlive;
function dr(e, t) {
	pr(e, "a", t);
}
function fr(e, t) {
	pr(e, "da", t);
}
function pr(e, t, n = Sa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (hr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) ur(e.parent.vnode) && mr(r, t, n, e), e = e.parent;
	}
}
function mr(e, t, n, r) {
	let i = hr(t, e, r, !0);
	Sr(() => {
		g(r[t], i);
	}, n);
}
function hr(e, t, n = Sa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			He();
			let i = Ea(n), a = cn(t, n, e, r);
			return i(), V(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var gr = (e) => (t, n = Sa) => {
	(!ka || e === "sp") && hr(e, (...e) => t(...e), n);
}, _r = gr("bm"), vr = gr("m"), yr = gr("bu"), br = gr("u"), xr = gr("bum"), Sr = gr("um"), Cr = gr("sp"), wr = gr("rtg"), Tr = gr("rtc");
function Er(e, t = Sa) {
	hr("ec", e, t);
}
var Dr = "components", Or = /* @__PURE__ */ Symbol.for("v-ndc");
function kr(e) {
	return w(e) ? Ar(Dr, e, !1) || e : e || Or;
}
function Ar(e, t, n = !0, r = !1) {
	let i = Dn || Sa;
	if (i) {
		let n = i.type;
		if (e === Dr) {
			let e = za(n, !1);
			if (e && (e === t || e === N(t) || e === ae(N(t)))) return n;
		}
		let a = jr(i[e] || n[e], t) || jr(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function jr(e, t) {
	return e && (e[t] || e[N(t)] || e[ae(N(t))]);
}
var Mr = (e) => e ? Oa(e) ? Ra(e) : Mr(e.parent) : null, Nr = /* @__PURE__ */ h(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Mr(e.parent),
	$root: (e) => Mr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Hr(e),
	$forceUpdate: (e) => e.f ||= () => {
		bn(e.update);
	},
	$nextTick: (e) => e.n ||= vn.bind(e.proxy),
	$watch: (e) => zn.bind(e)
}), Pr = (e, t) => e !== l && !e.__isScriptSetup && v(e, t), Fr = {
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
			else if (Pr(r, t)) return o[t] = 1, r[t];
			else if (i !== l && v(i, t)) return o[t] = 2, i[t];
			else if (v(a, t)) return o[t] = 3, a[t];
			else if (n !== l && v(n, t)) return o[t] = 4, n[t];
			else Lr && (o[t] = 0);
		}
		let u = Nr[t], d, f;
		if (u) return t === "$attrs" && Qe(e.attrs, "get", ""), u(e);
		if ((d = s.__cssModules) && (d = d[t])) return d;
		if (n !== l && v(n, t)) return o[t] = 4, n[t];
		if (f = c.config.globalProperties, v(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Pr(i, t) ? (i[t] = n, !0) : r !== l && v(r, t) ? (r[t] = n, !0) : v(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== l && s[0] !== "$" && v(e, s) || Pr(t, s) || v(a, s) || v(r, s) || v(Nr, s) || v(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? v(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Ir(e) {
	return y(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Lr = !0;
function Rr(e) {
	let t = Hr(e), n = e.proxy, r = e.ctx;
	Lr = !1, t.beforeCreate && Br(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: f, mounted: p, beforeUpdate: m, updated: h, activated: g, deactivated: _, beforeDestroy: v, beforeUnmount: b, destroyed: x, unmounted: S, render: w, renderTracked: T, renderTriggered: D, errorCaptured: O, serverPrefetch: k, expose: A, inheritAttrs: ee, components: te, directives: j, filters: ne } = t;
	if (l && zr(l, r, null), o) for (let e in o) {
		let t = o[e];
		C(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		E(t) && (e.data = /* @__PURE__ */ Nt(t));
	}
	if (Lr = !0, a) for (let e in a) {
		let t = a[e], i = Va({
			get: C(t) ? t.bind(n, n) : C(t.get) ? t.get.bind(n, n) : d,
			set: !C(t) && C(t.set) ? t.set.bind(n) : d
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) Vr(s[e], r, n, e);
	if (c) {
		let e = C(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			Nn(t, e[t]);
		});
	}
	u && Br(u, e, "c");
	function M(e, t) {
		y(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (M(_r, f), M(vr, p), M(yr, m), M(br, h), M(dr, g), M(fr, _), M(Er, O), M(Tr, T), M(wr, D), M(xr, b), M(Sr, S), M(Cr, k), y(A)) if (A.length) {
		let t = e.exposed ||= {};
		A.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	w && e.render === d && (e.render = w), ee != null && (e.inheritAttrs = ee), te && (e.components = te), j && (e.directives = j), k && ir(e);
}
function zr(e, t, n = d) {
	y(e) && (e = qr(e));
	for (let n in e) {
		let r = e[n], i;
		i = E(r) ? "default" in r ? Pn(r.from || n, r.default, !0) : Pn(r.from || n) : Pn(r), /* @__PURE__ */ Wt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Br(e, t, n) {
	cn(y(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Vr(e, t, n, r) {
	let i = r.includes(".") ? Bn(n, r) : () => n[r];
	if (w(e)) {
		let n = t[e];
		C(n) && Ln(i, n);
	} else if (C(e)) Ln(i, e.bind(n));
	else if (E(e)) if (y(e)) e.forEach((e) => Vr(e, t, n, r));
	else {
		let r = C(e.handler) ? e.handler.bind(n) : t[e.handler];
		C(r) && Ln(i, r, e);
	}
}
function Hr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ur(c, e, o, !0)), Ur(c, t, o)), E(t) && a.set(t, c), c;
}
function Ur(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ur(e, a, n, !0), i && i.forEach((t) => Ur(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Wr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Wr = {
	data: Gr,
	props: Xr,
	emits: Xr,
	methods: Yr,
	computed: Yr,
	beforeCreate: Jr,
	created: Jr,
	beforeMount: Jr,
	mounted: Jr,
	beforeUpdate: Jr,
	updated: Jr,
	beforeDestroy: Jr,
	beforeUnmount: Jr,
	destroyed: Jr,
	unmounted: Jr,
	activated: Jr,
	deactivated: Jr,
	errorCaptured: Jr,
	serverPrefetch: Jr,
	components: Yr,
	directives: Yr,
	watch: Zr,
	provide: Gr,
	inject: Kr
};
function Gr(e, t) {
	return t ? e ? function() {
		return h(C(e) ? e.call(this, this) : e, C(t) ? t.call(this, this) : t);
	} : t : e;
}
function Kr(e, t) {
	return Yr(qr(e), qr(t));
}
function qr(e) {
	if (y(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Jr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Yr(e, t) {
	return e ? h(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xr(e, t) {
	return e ? y(e) && y(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : h(/* @__PURE__ */ Object.create(null), Ir(e), Ir(t ?? {})) : t;
}
function Zr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = h(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Jr(e[r], t[r]);
	return n;
}
function Qr() {
	return {
		app: null,
		config: {
			isNativeTag: f,
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
var $r = 0;
function ei(e, t) {
	return function(n, r = null) {
		C(n) || (n = h({}, n)), r != null && !E(r) && (r = null);
		let i = Qr(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: $r++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ua,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && C(e.install) ? (a.add(e), e.install(c, ...t)) : C(e) && (a.add(e), e(c, ...t))), c;
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
					let u = c._ceVNode || ca(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ra(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (cn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ti;
				ti = c;
				try {
					return e();
				} finally {
					ti = t;
				}
			}
		};
		return c;
	};
}
var ti = null, ni = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${N(t)}Modifiers`] || e[`${ie(t)}Modifiers`];
function ri(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || l, i = n, a = t.startsWith("update:"), o = a && ni(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => w(e) ? e.trim() : e)), o.number && (i = n.map(ce)));
	let s, c = r[s = oe(t)] || r[s = oe(N(t))];
	!c && a && (c = r[s = oe(ie(t))]), c && cn(c, e, 6, i);
	let u = r[s + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, cn(u, e, 6, i);
	}
}
var ii = /* @__PURE__ */ new WeakMap();
function ai(e, t, n = !1) {
	let r = n ? ii : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!C(e)) {
		let r = (e) => {
			let n = ai(e, t, !0);
			n && (s = !0, h(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (E(e) && r.set(e, null), null) : (y(a) ? a.forEach((e) => o[e] = null) : h(o, a), E(e) && r.set(e, o), o);
}
function oi(e, t) {
	return !e || !p(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), v(e, t[0].toLowerCase() + t.slice(1)) || v(e, ie(t)) || v(e, t));
}
function si(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: h, inheritAttrs: g } = e, _ = kn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ma(l.call(t, e, u, d, p, f, h)), y = s;
		} else {
			let e = t;
			v = ma(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), y = t.props ? s : ci(s);
		}
	} catch (t) {
		Yi.length = 0, ln(t, e, 1), v = ca(qi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(m) && (y = li(y, a)), b = da(b, y, !1, !0));
	}
	return n.dirs && (b = da(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && nr(b, n.transition), v = b, kn(_), v;
}
var ci = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || p(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, li = (e, t) => {
	let n = {};
	for (let r in e) (!m(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function ui(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? di(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (fi(o, r, n) && !oi(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? di(r, o, l) : !0 : !!o;
	return !1;
}
function di(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (fi(t, e, a) && !oi(n, a)) return !0;
	}
	return !1;
}
function fi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && E(r) && E(i) ? !I(r, i) : r !== i;
}
function pi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var mi = {}, hi = () => Object.create(mi), gi = (e) => Object.getPrototypeOf(e) === mi;
function _i(e, t, n, r = !1) {
	let i = {}, a = hi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), yi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Pt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function vi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ H(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (oi(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (v(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = N(o);
					i[t] = bi(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		yi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !v(t, a) && ((r = ie(a)) === a || !v(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = bi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !v(t, e)) && (delete a[e], l = !0);
	}
	l && $e(e.attrs, "set", "");
}
function yi(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (j(c)) continue;
		let l = t[c], u;
		i && v(i, u = N(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : oi(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ H(n), r = s || l;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = bi(i, t, s, r[s], e, !v(r, s));
		}
	}
	return o;
}
function bi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = v(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && C(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ea(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ie(n)) && (r = !0));
	}
	return r;
}
var xi = /* @__PURE__ */ new WeakMap();
function Si(e, t, n = !1) {
	let r = n ? xi : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!C(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Si(e, t, !0);
			h(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return E(e) && r.set(e, u), u;
	if (y(a)) for (let e = 0; e < a.length; e++) {
		let t = N(a[e]);
		Ci(t) && (o[t] = l);
	}
	else if (a) for (let e in a) {
		let t = N(e);
		if (Ci(t)) {
			let n = a[e], r = o[t] = y(n) || C(n) ? { type: n } : h({}, n), i = r.type, c = !1, l = !0;
			if (y(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = C(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = C(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || v(r, "default")) && s.push(t);
		}
	}
	let d = [o, s];
	return E(e) && r.set(e, d), d;
}
function Ci(e) {
	return e[0] !== "$" && !j(e);
}
var wi = (e) => e === "_" || e === "_ctx" || e === "$stable", Ti = (e) => y(e) ? e.map(ma) : [ma(e)], Ei = (e, t, n) => {
	if (t._n) return t;
	let r = An((...e) => Ti(t(...e)), n);
	return r._c = !1, r;
}, Di = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (wi(n)) continue;
		let i = e[n];
		if (C(i)) t[n] = Ei(n, i, r);
		else if (i != null) {
			let e = Ti(i);
			t[n] = () => e;
		}
	}
}, Oi = (e, t) => {
	let n = Ti(t);
	e.slots.default = () => n;
}, ki = (e, t, n) => {
	for (let r in t) (n || !wi(r)) && (e[r] = t[r]);
}, Ai = (e, t, n) => {
	let r = e.slots = hi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (ki(r, t, n), n && F(r, "_", e, !0)) : Di(t, r);
	} else t && Oi(e, t);
}, ji = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = l;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : ki(i, t, n) : (a = !t.$stable, Di(t, i)), o = t;
	} else t && (Oi(e, t), o = { default: 1 });
	if (a) for (let e in i) !wi(e) && o[e] == null && delete i[e];
}, Mi = Wi;
function Ni(e) {
	return Pi(e);
}
function Pi(e, t) {
	let n = de();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = d, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !aa(e, t) && (r = pe(e), F(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Ki:
				y(e, t, n, r);
				break;
			case qi:
				b(e, t, n, r);
				break;
			case Ji:
				e ?? x(t, n, r, o);
				break;
			case Gi:
				ee(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? te(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ge);
		}
		u != null && i ? sr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && sr(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), i(e), e = n;
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
	}, T = (e, t, n, i, s, c, l, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = o(e.type, c, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, i, s, Fi(e, c), l, u), _ && Mn(e, null, i, "created"), E(d, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !j(e) && a(d, e, null, m[e], c, i);
			"value" in m && a(d, "value", null, m.value, c), (f = m.onVnodeBeforeMount) && va(f, i, e);
		}
		_ && Mn(e, null, i, "beforeMount");
		let v = Li(s, g);
		v && g.beforeEnter(d), r(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Mi(() => {
			try {
				f && va(f, i, e), v && g.enter(d), _ && Mn(e, null, i, "mounted");
			} finally {}
		}, s);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Ui(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ha(e[l]) : ma(e[l]), t, n, r, i, a, o, s);
	}, O = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || l, h = t.props || l, g;
		if (n && Ii(n, !1), (g = h.onVnodeBeforeUpdate) && va(g, n, t, e), f && Mn(t, e, n, "beforeUpdate"), n && Ii(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(c, ""), d ? k(e.dynamicChildren, d, c, n, r, Fi(t, i), o) : s || ie(e, t, c, null, n, r, Fi(t, i), o, !1), u > 0) {
			if (u & 16) A(c, m, h, n, i);
			else if (u & 2 && m.class !== h.class && a(c, "class", null, h.class, i), u & 4 && a(c, "style", m.style, h.style, i), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = m[r], s = h[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			u & 1 && e.children !== t.children && p(c, t.children);
		} else !s && d == null && A(c, m, h, n, i);
		((g = h.onVnodeUpdated) || f) && Mi(() => {
			g && va(g, n, t, e), f && Mn(t, e, n, "updated");
		}, r);
	}, k = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === Gi || !aa(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, A = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== l) for (let o in t) !j(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (j(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, ee = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (k(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Ri(e, t, !0)) : ie(e, t, n, f, a, o, c, l, u);
	}, te = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ne(t, n, r, i, a, o, c) : M(e, t, c);
	}, ne = (e, t, n, r, i, a, o) => {
		let s = e.component = xa(e, r, i);
		if (ur(e) && (s.ctx.renderer = ge), Aa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, N, o), !e.el) {
				let r = s.subTree = ca(qi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else N(s, e, t, n, i, a, o);
	}, M = (e, t, n) => {
		let r = t.component = e.component;
		if (ui(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			re(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, N = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Bi(e);
					if (n) {
						t && (t.el = c.el, re(e, t, o)), n.asyncDep.then(() => {
							Mi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ii(e, !1), t ? (t.el = c.el, re(e, t, o)) : t = c, n && se(n), (d = t.props && t.props.onVnodeBeforeUpdate) && va(d, s, t, c), Ii(e, !0);
				let f = si(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), pe(p), e, i, a), t.el = f.el, u === null && pi(e, f.el), r && Mi(r, i), (d = t.props && t.props.onVnodeUpdated) && Mi(() => va(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = lr(t);
				if (Ii(e, !1), l && se(l), !m && (o = c && c.onVnodeBeforeMount) && va(o, d, t), Ii(e, !0), s && ve) {
					let t = () => {
						e.subTree = si(e), ve(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = si(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Mi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Mi(() => va(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && lr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Mi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new De(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => bn(u), Ii(e, !0), l();
	}, re = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, vi(e, t.props, r, n), ji(e, t.children, n), He(), Cn(e), V();
	}, ie = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				oe(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				ae(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && fe(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? oe(l, d, n, r, i, a, o, s, c) : fe(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		e ||= u, t ||= u;
		let l = e.length, d = t.length, f = Math.min(l, d), p;
		for (p = 0; p < f; p++) {
			let r = t[p] = c ? ha(t[p]) : ma(t[p]);
			v(e[p], r, n, null, i, a, o, s, c);
		}
		l > d ? fe(e, i, a, !0, !1, f) : D(t, n, r, i, a, o, s, c, f);
	}, oe = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; l <= f && l <= p;) {
			let r = e[l], u = t[l] = c ? ha(t[l]) : ma(t[l]);
			if (aa(r, u)) v(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= f && l <= p;) {
			let r = e[f], l = t[p] = c ? ha(t[p]) : ma(t[p]);
			if (aa(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			f--, p--;
		}
		if (l > f) {
			if (l <= p) {
				let e = p + 1, u = e < d ? t[e].el : r;
				for (; l <= p;) v(null, t[l] = c ? ha(t[l]) : ma(t[l]), n, u, i, a, o, s, c), l++;
			}
		} else if (l > p) for (; l <= f;) F(e[l], i, a, !0), l++;
		else {
			let m = l, h = l, g = /* @__PURE__ */ new Map();
			for (l = h; l <= p; l++) {
				let e = t[l] = c ? ha(t[l]) : ma(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = m; l <= f; l++) {
				let r = e[l];
				if (y >= b) {
					F(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && aa(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? F(r, i, a, !0) : (C[u - h] = l + 1, u >= S ? S = u : x = !0, v(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let w = x ? zi(C) : u;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = h + l, u = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Hi(f) : r;
				C[l] === 0 ? v(null, u, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? P(u, n, p, 2) : _--);
			}
		}
	}, P = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			P(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, ge);
			return;
		}
		if (c === Gi) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) P(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === Ji) {
			S(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[Un] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), Mi(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[Un];
				s._isLeaving && s[Un](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, F = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (He(), sr(s, null, n, e, !0), V()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !lr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && va(_, t, e), u & 6) ue(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Mn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ge, r) : l && !l.hasOnce && (a !== Gi || d > 0 && d & 64) ? fe(l, t, n, !1, !0) : (a === Gi && d & 384 || !i && u & 16) && fe(c, t, n), r && ce(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Mi(() => {
			_ && va(_, t, e), h && Mn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ce = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === Gi) {
			le(n, r);
			return;
		}
		if (t === Ji) {
			C(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, le = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, ue = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Vi(c), Vi(l), r && se(r), i.stop(), a && (a.flags |= 8, F(o, e, t, n)), s && Mi(s, t), Mi(() => {
			e.isUnmounted = !0;
		}, t);
	}, fe = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) F(e[o], t, n, r, i);
	}, pe = (e) => {
		if (e.shapeFlag & 6) return pe(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Vn];
		return n ? h(n) : t;
	}, me = !1, he = (e, t, n) => {
		let r;
		e == null ? t._vnode && (F(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, me ||= (me = !0, Cn(r), wn(), !1);
	}, ge = {
		p: v,
		um: F,
		m: P,
		r: ce,
		mt: ne,
		mc: D,
		pc: ie,
		pbc: k,
		n: pe,
		o: e
	}, _e, ve;
	return t && ([_e, ve] = t(ge)), {
		render: he,
		hydrate: _e,
		createApp: ei(he, _e)
	};
}
function Fi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ii({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Li(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ri(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (y(r) && y(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ha(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ri(t, a)), a.type === Ki && (a.patchFlag === -1 && (a = i[e] = ha(a)), a.el = t.el), a.type === qi && !a.el && (a.el = t.el);
	}
}
function zi(e) {
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
function Bi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Bi(t);
}
function Vi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Hi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Hi(t.subTree) : null;
}
var Ui = (e) => e.__isSuspense;
function Wi(e, t) {
	t && t.pendingBranch ? y(e) ? t.effects.push(...e) : t.effects.push(e) : Sn(e);
}
var Gi = /* @__PURE__ */ Symbol.for("v-fgt"), Ki = /* @__PURE__ */ Symbol.for("v-txt"), qi = /* @__PURE__ */ Symbol.for("v-cmt"), Ji = /* @__PURE__ */ Symbol.for("v-stc"), Yi = [], Xi = null;
function Zi(e = !1) {
	Yi.push(Xi = e ? null : []);
}
function Qi() {
	Yi.pop(), Xi = Yi[Yi.length - 1] || null;
}
var $i = 1;
function ea(e, t = !1) {
	$i += e, e < 0 && Xi && t && (Xi.hasOnce = !0);
}
function ta(e) {
	return e.dynamicChildren = $i > 0 ? Xi || u : null, Qi(), $i > 0 && Xi && Xi.push(e), e;
}
function na(e, t, n, r, i, a) {
	return ta(U(e, t, n, r, i, a, !0));
}
function ra(e, t, n, r, i) {
	return ta(ca(e, t, n, r, i, !0));
}
function ia(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function aa(e, t) {
	return e.type === t.type && e.key === t.key;
}
var oa = ({ key: e }) => e ?? null, sa = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : w(e) || /* @__PURE__ */ Wt(e) || C(e) ? {
	i: Dn,
	r: e,
	k: t,
	f: !!n
} : e);
function U(e, t = null, n = null, r = 0, i = null, a = e === Gi ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && oa(t),
		ref: t && sa(t),
		scopeId: On,
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
		ctx: Dn
	};
	return s ? (ga(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= w(n) ? 8 : 16), $i > 0 && !o && Xi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Xi.push(c), c;
}
var ca = la;
function la(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Or) && (e = qi), ia(e)) {
		let r = da(e, t, !0);
		return n && ga(r, n), $i > 0 && !a && Xi && (r.shapeFlag & 6 ? Xi[Xi.indexOf(e)] = r : Xi.push(r)), r.patchFlag = -2, r;
	}
	if (Ba(e) && (e = e.__vccOpts), t) {
		t = ua(t);
		let { class: e, style: n } = t;
		e && !w(e) && (t.class = _e(e)), E(n) && (/* @__PURE__ */ Bt(n) && !y(n) && (n = h({}, n)), t.style = fe(n));
	}
	let o = w(e) ? 1 : Ui(e) ? 128 : Hn(e) ? 64 : E(e) ? 4 : C(e) ? 2 : 0;
	return U(e, t, n, r, i, o, a, !0);
}
function ua(e) {
	return e ? /* @__PURE__ */ Bt(e) || gi(e) ? h({}, e) : e : null;
}
function da(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? _a(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && oa(l),
		ref: t && t.ref ? n && a ? y(a) ? a.concat(sa(t)) : [a, sa(t)] : sa(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Gi ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && da(e.ssContent),
		ssFallback: e.ssFallback && da(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && nr(u, c.clone(u)), u;
}
function fa(e = " ", t = 0) {
	return ca(Ki, null, e, t);
}
function pa(e = "", t = !1) {
	return t ? (Zi(), ra(qi, null, e)) : ca(qi, null, e);
}
function ma(e) {
	return e == null || typeof e == "boolean" ? ca(qi) : y(e) ? ca(Gi, null, e.slice()) : ia(e) ? ha(e) : ca(Ki, null, String(e));
}
function ha(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : da(e);
}
function ga(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (y(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ga(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !gi(t) ? t._ctx = Dn : r === 3 && Dn && (Dn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (C(t)) {
		if (r & 65) {
			ga(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: Dn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [fa(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function _a(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = _e([t.class, r.class]));
		else if (e === "style") t.style = fe([t.style, r.style]);
		else if (p(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(y(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !m(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function va(e, t, n, r = null) {
	cn(e, t, 7, [n, r]);
}
var ya = Qr(), ba = 0;
function xa(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || ya, a = {
		uid: ba++,
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
		scope: new R(!0),
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
		propsOptions: Si(r, i),
		emitsOptions: ai(r, i),
		emit: null,
		emitted: null,
		propsDefaults: l,
		inheritAttrs: r.inheritAttrs,
		ctx: l,
		data: l,
		props: l,
		attrs: l,
		slots: l,
		refs: l,
		setupState: l,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ri.bind(null, a), e.ce && e.ce(a), a;
}
var Sa = null, Ca = () => Sa || Dn, wa, Ta;
{
	let e = de(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	wa = t("__VUE_INSTANCE_SETTERS__", (e) => Sa = e), Ta = t("__VUE_SSR_SETTERS__", (e) => ka = e);
}
var Ea = (e) => {
	let t = Sa;
	return wa(e), e.scope.on(), () => {
		e.scope.off(), wa(t);
	};
}, Da = () => {
	Sa && Sa.scope.off(), wa(null);
};
function Oa(e) {
	return e.vnode.shapeFlag & 4;
}
var ka = !1;
function Aa(e, t = !1, n = !1) {
	t && Ta(t);
	let { props: r, children: i } = e.vnode, a = Oa(e);
	_i(e, r, a, t), Ai(e, i, n || t);
	let o = a ? ja(e, t) : void 0;
	return t && Ta(!1), o;
}
function ja(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Fr);
	let { setup: r } = n;
	if (r) {
		He();
		let n = e.setupContext = r.length > 1 ? La(e) : null, i = Ea(e), a = sn(r, e, 0, [e.props, n]), o = D(a);
		if (V(), i(), (o || e.sp) && !lr(e) && ir(e), o) {
			if (a.then(Da, Da), t) return a.then((n) => {
				Ma(e, n, t);
			}).catch((t) => {
				ln(t, e, 0);
			});
			e.asyncDep = a;
		} else Ma(e, a, t);
	} else Fa(e, t);
}
function Ma(e, t, n) {
	C(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : E(t) && (e.setupState = Zt(t)), Fa(e, n);
}
var Na, Pa;
function Fa(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Na && !r.render) {
			let t = r.template || Hr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Na(t, h(h({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || d, Pa && Pa(e);
	}
	{
		let t = Ea(e);
		He();
		try {
			Rr(e);
		} finally {
			V(), t();
		}
	}
}
var Ia = { get(e, t) {
	return Qe(e, "get", ""), e[t];
} };
function La(e) {
	return {
		attrs: new Proxy(e.attrs, Ia),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ra(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Zt(Vt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Nr) return Nr[n](e);
		},
		has(e, t) {
			return t in e || t in Nr;
		}
	}) : e.proxy;
}
function za(e, t = !0) {
	return C(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ba(e) {
	return C(e) && "__vccOpts" in e;
}
var Va = (e, t) => /* @__PURE__ */ $t(e, t, ka);
function Ha(e, t, n) {
	try {
		ea(-1);
		let r = arguments.length;
		return r === 2 ? E(t) && !y(t) ? ia(t) ? ca(e, null, [t]) : ca(e, t) : ca(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ia(n) && (n = [n]), ca(e, t, n));
	} finally {
		ea(1);
	}
}
var Ua = "3.5.39", Wa = void 0, Ga = typeof window < "u" && window.trustedTypes;
if (Ga) try {
	Wa = /* @__PURE__ */ Ga.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ka = Wa ? (e) => Wa.createHTML(e) : (e) => e, qa = "http://www.w3.org/2000/svg", Ja = "http://www.w3.org/1998/Math/MathML", Ya = typeof document < "u" ? document : null, Xa = Ya && /* @__PURE__ */ Ya.createElement("template"), Za = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Ya.createElementNS(qa, e) : t === "mathml" ? Ya.createElementNS(Ja, e) : n ? Ya.createElement(e, { is: n }) : Ya.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Ya.createTextNode(e),
	createComment: (e) => Ya.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Ya.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Xa.innerHTML = Ka(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Xa.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Qa = "transition", $a = "animation", eo = /* @__PURE__ */ Symbol("_vtc"), to = {
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
}, no = /* @__PURE__ */ h({}, qn, to), ro = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = no, e))((e, { slots: t }) => Ha(Zn, oo(e), t)), io = (e, t = []) => {
	y(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, ao = (e) => e ? y(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function oo(e) {
	let t = {};
	for (let n in e) n in to || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: f = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, m = so(i), g = m && m[0], _ = m && m[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, uo(e, t ? u : s), uo(e, t ? l : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, uo(e, d), uo(e, p), uo(e, f), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		io(i, [t, o]), fo(() => {
			uo(t, e ? c : a), lo(t, e ? u : s), ao(i) || mo(t, r, g, o);
		});
	};
	return h(t, {
		onBeforeEnter(e) {
			io(v, [e]), lo(e, a), lo(e, o);
		},
		onBeforeAppear(e) {
			io(C, [e]), lo(e, c), lo(e, l);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			lo(e, d), e._enterCancelled ? (lo(e, f), vo(e)) : (vo(e), lo(e, f)), fo(() => {
				e._isLeaving && (uo(e, d), lo(e, p), ao(x) || mo(e, r, _, n));
			}), io(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), io(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), io(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), io(S, [e]);
		}
	});
}
function so(e) {
	if (e == null) return null;
	if (E(e)) return [co(e.enter), co(e.leave)];
	{
		let t = co(e);
		return [t, t];
	}
}
function co(e) {
	return le(e);
}
function lo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[eo] || (e[eo] = /* @__PURE__ */ new Set())).add(t);
}
function uo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[eo];
	n && (n.delete(t), n.size || (e[eo] = void 0));
}
function fo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var po = 0;
function mo(e, t, n, r) {
	let i = e._endId = ++po, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = ho(e, t);
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
function ho(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Qa}Delay`), a = r(`${Qa}Duration`), o = go(i, a), s = r(`${$a}Delay`), c = r(`${$a}Duration`), l = go(s, c), u = null, d = 0, f = 0;
	t === Qa ? o > 0 && (u = Qa, d = o, f = a.length) : t === $a ? l > 0 && (u = $a, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Qa : $a : null, f = u ? u === Qa ? a.length : c.length : 0);
	let p = u === Qa && /\b(?:transform|all)(?:,|$)/.test(r(`${Qa}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function go(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => _o(t) + _o(e[n])));
}
function _o(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function vo(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function yo(e, t, n) {
	let r = e[eo];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var bo = /* @__PURE__ */ Symbol("_vod"), xo = /* @__PURE__ */ Symbol("_vsh"), So = /* @__PURE__ */ Symbol(""), Co = /(?:^|;)\s*display\s*:/;
function wo(e, t, n) {
	let r = e.style, i = w(n), a = !1;
	if (n && !i) {
		if (t) if (w(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Eo(r, t, "");
		}
		else for (let e in t) n[e] ?? Eo(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Eo(r, i, "") : Ao(e, i, !w(t) && t ? t[i] : void 0, o) || Eo(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[So];
			e && (n += ";" + e), r.cssText = n, a = Co.test(n);
		}
	} else t && e.removeAttribute("style");
	bo in e && (e[bo] = a ? r.display : "", e[xo] && (r.display = "none"));
}
var To = /\s*!important$/;
function Eo(e, t, n) {
	if (y(n)) n.forEach((n) => Eo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = ko(e, t);
		To.test(n) ? e.setProperty(ie(r), n.replace(To, ""), "important") : e[r] = n;
	}
}
var Do = [
	"Webkit",
	"Moz",
	"ms"
], Oo = {};
function ko(e, t) {
	let n = Oo[t];
	if (n) return n;
	let r = N(t);
	if (r !== "filter" && r in e) return Oo[t] = r;
	r = ae(r);
	for (let n = 0; n < Do.length; n++) {
		let i = Do[n] + r;
		if (i in e) return Oo[t] = i;
	}
	return t;
}
function Ao(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && w(r) && n === r;
}
var jo = "http://www.w3.org/1999/xlink";
function Mo(e, t, n, r, i, a = ye(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(jo, t.slice(6, t.length)) : e.setAttributeNS(jo, t, n) : n == null || a && !be(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : T(n) ? String(n) : n);
}
function No(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ka(n) : n);
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
		r === "boolean" ? n = be(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Po(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Fo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Io = /* @__PURE__ */ Symbol("_vei");
function Lo(e, t, n, r, i = null) {
	let a = e[Io] || (e[Io] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Bo(t);
		r ? Po(e, n, a[t] = Wo(r, i), s) : o && (Fo(e, n, o, s), a[t] = void 0);
	}
}
var Ro = /(Once|Passive|Capture)$/, zo = /^on:?(?:Once|Passive|Capture)$/;
function Bo(e) {
	let t, n;
	for (; (n = e.match(Ro)) && !zo.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : ie(e.slice(2)), t];
}
var Vo = 0, Ho = /* @__PURE__ */ Promise.resolve(), Uo = () => Vo ||= (Ho.then(() => Vo = 0), Date.now());
function Wo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (y(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && cn(e, t, 5, a);
			}
		} else cn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Uo(), n;
}
var Go = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ko = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? yo(e, r, o) : t === "style" ? wo(e, n, r) : p(t) ? m(t) || Lo(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : qo(e, t, r, o)) ? (No(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Mo(e, t, r, o, a, t !== "value")) : e._isVueCE && (Jo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !w(r))) ? No(e, N(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Mo(e, t, r, o));
};
function qo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Go(t) && C(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Go(t) && w(n) ? !1 : t in e;
}
function Jo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = N(t);
	return Array.isArray(n) ? n.some((e) => N(e) === r) : Object.keys(n).some((e) => N(e) === r);
}
var Yo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return y(t) ? (e) => se(t, e) : t;
};
function Xo(e) {
	e.target.composing = !0;
}
function Zo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Qo = /* @__PURE__ */ Symbol("_assign");
function $o(e, t, n) {
	return t && (e = e.trim()), n && (e = ce(e)), e;
}
var es = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Qo] = Yo(i);
		let a = r || i.props && i.props.type === "number";
		Po(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Qo]($o(e.value, n, a));
		}), (n || a) && Po(e, "change", () => {
			e.value = $o(e.value, n, a);
		}), t || (Po(e, "compositionstart", Xo), Po(e, "compositionend", Zo), Po(e, "change", Zo));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Qo] = Yo(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ce(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, ts = /* @__PURE__ */ h({ patchProp: Ko }, Za), ns;
function rs() {
	return ns ||= Ni(ts);
}
var is = ((...e) => {
	let t = rs().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = os(e);
		if (!r) return;
		let i = t._component;
		!C(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, as(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function as(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function os(e) {
	return w(e) ? document.querySelector(e) : e;
}
var ss = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2
}, cs = {
	ROTATE: 0,
	PAN: 1,
	DOLLY_PAN: 2,
	DOLLY_ROTATE: 3
}, ls = 1e3, us = 1001, ds = 1002, fs = 1003, ps = 1004, ms = 1005, hs = 1006, gs = 1007, _s = 1008, vs = 1009, ys = 1010, bs = 1011, xs = 1012, Ss = 1013, Cs = 1014, ws = 1015, Ts = 1016, Es = 1017, Ds = 1018, Os = 1020, ks = 35902, As = 35899, js = 1021, Ms = 1022, Ns = 1023, Ps = 1026, Fs = 1027, Is = 1028, Ls = 1029, Rs = 1030, zs = 1031, Bs = 1033, Vs = 33776, Hs = 33777, Us = 33778, Ws = 33779, Gs = 35840, Ks = 35841, qs = 35842, Js = 35843, Ys = 36196, Xs = 37492, Zs = 37496, Qs = 37488, $s = 37489, ec = 37490, tc = 37491, nc = 37808, rc = 37809, ic = 37810, ac = 37811, oc = 37812, sc = 37813, cc = 37814, lc = 37815, uc = 37816, dc = 37817, fc = 37818, pc = 37819, mc = 37820, hc = 37821, gc = 36492, _c = 36494, vc = 36495, yc = 36283, bc = 36284, xc = 36285, Sc = 36286, Cc = 2300, wc = 2301, Tc = 2302, Ec = 2303, Dc = 2400, Oc = 2401, kc = 2402, Ac = 3200, jc = "srgb", Mc = "srgb-linear", Nc = "linear", Pc = "srgb", Fc = 7680, Ic = 35044, Lc = 2e3;
function Rc(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function zc(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Bc(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Vc() {
	let e = Bc("canvas");
	return e.style.display = "block", e;
}
var Hc = {}, Uc = null;
function Wc(...e) {
	let t = "THREE." + e.shift();
	Uc ? Uc("log", t, ...e) : console.log(t, ...e);
}
function Gc(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function W(...e) {
	e = Gc(e);
	let t = "THREE." + e.shift();
	if (Uc) Uc("warn", t, ...e);
	else {
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function G(...e) {
	e = Gc(e);
	let t = "THREE." + e.shift();
	if (Uc) Uc("error", t, ...e);
	else {
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function Kc(...e) {
	let t = e.join(" ");
	t in Hc || (Hc[t] = !0, W(...e));
}
function qc(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var Jc = {
	0: 1,
	2: 6,
	4: 7,
	3: 5,
	1: 0,
	6: 2,
	7: 4,
	5: 3
}, Yc = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, Xc = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), Zc = 1234567, Qc = Math.PI / 180, $c = 180 / Math.PI;
function el() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (Xc[e & 255] + Xc[e >> 8 & 255] + Xc[e >> 16 & 255] + Xc[e >> 24 & 255] + "-" + Xc[t & 255] + Xc[t >> 8 & 255] + "-" + Xc[t >> 16 & 15 | 64] + Xc[t >> 24 & 255] + "-" + Xc[n & 63 | 128] + Xc[n >> 8 & 255] + "-" + Xc[n >> 16 & 255] + Xc[n >> 24 & 255] + Xc[r & 255] + Xc[r >> 8 & 255] + Xc[r >> 16 & 255] + Xc[r >> 24 & 255]).toLowerCase();
}
function K(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function tl(e, t) {
	return (e % t + t) % t;
}
function nl(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function rl(e, t, n) {
	return e === t ? 0 : (n - e) / (t - e);
}
function il(e, t, n) {
	return (1 - n) * e + n * t;
}
function al(e, t, n, r) {
	return il(e, t, 1 - Math.exp(-n * r));
}
function ol(e, t = 1) {
	return t - Math.abs(tl(e, t * 2) - t);
}
function sl(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function cl(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function ll(e, t) {
	return e + Math.floor(Math.random() * (t - e + 1));
}
function ul(e, t) {
	return e + Math.random() * (t - e);
}
function dl(e) {
	return e * (.5 - Math.random());
}
function fl(e) {
	e !== void 0 && (Zc = e);
	let t = Zc += 1831565813;
	return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function pl(e) {
	return e * Qc;
}
function ml(e) {
	return e * $c;
}
function hl(e) {
	return (e & e - 1) == 0 && e !== 0;
}
function gl(e) {
	return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function _l(e) {
	return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function vl(e, t, n, r, i) {
	let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2);
	switch (i) {
		case "XYX":
			e.set(s * u, c * d, c * f, s * l);
			break;
		case "YZY":
			e.set(c * f, s * u, c * d, s * l);
			break;
		case "ZXZ":
			e.set(c * d, c * f, s * u, s * l);
			break;
		case "XZX":
			e.set(s * u, c * m, c * p, s * l);
			break;
		case "YXY":
			e.set(c * p, s * u, c * m, s * l);
			break;
		case "ZYZ":
			e.set(c * m, c * p, s * u, s * l);
			break;
		default: W("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
	}
}
function yl(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return e / 4294967295;
		case Uint16Array: return e / 65535;
		case Uint8Array: return e / 255;
		case Int32Array: return Math.max(e / 2147483647, -1);
		case Int16Array: return Math.max(e / 32767, -1);
		case Int8Array: return Math.max(e / 127, -1);
		default: throw Error("THREE.MathUtils: Invalid component type.");
	}
}
function bl(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return Math.round(e * 4294967295);
		case Uint16Array: return Math.round(e * 65535);
		case Uint8Array: return Math.round(e * 255);
		case Int32Array: return Math.round(e * 2147483647);
		case Int16Array: return Math.round(e * 32767);
		case Int8Array: return Math.round(e * 127);
		default: throw Error("THREE.MathUtils: Invalid component type.");
	}
}
var xl = {
	DEG2RAD: Qc,
	RAD2DEG: $c,
	generateUUID: el,
	clamp: K,
	euclideanModulo: tl,
	mapLinear: nl,
	inverseLerp: rl,
	lerp: il,
	damp: al,
	pingpong: ol,
	smoothstep: sl,
	smootherstep: cl,
	randInt: ll,
	randFloat: ul,
	randFloatSpread: dl,
	seededRandom: fl,
	degToRad: pl,
	radToDeg: ml,
	isPowerOfTwo: hl,
	ceilPowerOfTwo: gl,
	floorPowerOfTwo: _l,
	setQuaternionFromProperEuler: vl,
	normalize: bl,
	denormalize: yl
}, q = class e {
	static {
		e.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = K(this.x, e.x, t.x), this.y = K(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = K(this.x, e, t), this.y = K(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(K(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(K(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, Sl = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: W("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(K(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, J = class e {
	static {
		e.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(wl.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(wl.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = K(this.x, e.x, t.x), this.y = K(this.y, e.y, t.y), this.z = K(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = K(this.x, e, t), this.y = K(this.y, e, t), this.z = K(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(K(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return Cl.copy(this).projectOnVector(e), this.sub(Cl);
	}
	reflect(e) {
		return this.sub(Cl.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(K(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, Cl = /*@__PURE__*/ new J(), wl = /*@__PURE__*/ new Sl(), Y = class e {
	static {
		e.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return Kc("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Tl.makeScale(e, t)), this;
	}
	rotate(e) {
		return Kc("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Tl.makeRotation(-e)), this;
	}
	translate(e, t) {
		return Kc("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Tl.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, Tl = /*@__PURE__*/ new Y(), El = /*@__PURE__*/ new Y().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Dl = /*@__PURE__*/ new Y().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function Ol() {
	let e = {
		enabled: !0,
		workingColorSpace: Mc,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n ? e : (this.spaces[t].transfer === "srgb" && (e.r = kl(e.r), e.g = kl(e.g), e.b = kl(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = Al(e.r), e.g = Al(e.g), e.b = Al(e.b)), e);
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? Nc : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		},
		fromWorkingColorSpace: function(t, n) {
			return Kc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(t, n);
		},
		toWorkingColorSpace: function(t, n) {
			return Kc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(t, n);
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[Mc]: {
			primaries: t,
			whitePoint: r,
			transfer: Nc,
			toXYZ: El,
			fromXYZ: Dl,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: jc },
			outputColorSpaceConfig: { drawingBufferColorSpace: jc }
		},
		[jc]: {
			primaries: t,
			whitePoint: r,
			transfer: Pc,
			toXYZ: El,
			fromXYZ: Dl,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: jc }
		}
	}), e;
}
var X = /*@__PURE__*/ Ol();
function kl(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function Al(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var jl, Ml = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			jl === void 0 && (jl = Bc("canvas")), jl.width = e.width, jl.height = e.height;
			let t = jl.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = jl;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = Bc("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = kl(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		} else if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(kl(t[e] / 255) * 255) : t[e] = kl(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		} else return W("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, Nl = 0, Pl = class {
	constructor(e = null) {
		this.isSource = !0, Object.defineProperty(this, "id", { value: Nl++ }), this.uuid = el(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width, t.height, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(Fl(r[t].image)) : e.push(Fl(r[t]));
			} else e = Fl(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function Fl(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Ml.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (W("Texture: Unable to serialize Texture."), {});
}
var Il = 0, Ll = /*@__PURE__*/ new J(), Rl = class e extends Yc {
	constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, r = us, i = us, a = hs, o = _s, s = Ns, c = vs, l = e.DEFAULT_ANISOTROPY, u = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Il++ }), this.uuid = el(), this.name = "", this.source = new Pl(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = r, this.wrapT = i, this.magFilter = a, this.minFilter = o, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = c, this.offset = new q(0, 0), this.repeat = new q(1, 1), this.center = new q(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Y(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(Ll).x;
	}
	get height() {
		return this.source.getSize(Ll).y;
	}
	get depth() {
		return this.source.getSize(Ll).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				W(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				W(`Texture.setValues(): property '${t}' does not exist.`);
				continue;
			}
			r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(e) {
		if (this.mapping !== 300) return e;
		if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
			case ls:
				e.x -= Math.floor(e.x);
				break;
			case us:
				e.x = e.x < 0 ? 0 : 1;
				break;
			case ds:
				Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x);
				break;
		}
		if (e.y < 0 || e.y > 1) switch (this.wrapT) {
			case ls:
				e.y -= Math.floor(e.y);
				break;
			case us:
				e.y = e.y < 0 ? 0 : 1;
				break;
			case ds:
				Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y);
				break;
		}
		return this.flipY && (e.y = 1 - e.y), e;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
Rl.DEFAULT_IMAGE = null, Rl.DEFAULT_MAPPING = 300, Rl.DEFAULT_ANISOTROPY = 1;
var zl = class e {
	static {
		e.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = K(this.x, e.x, t.x), this.y = K(this.y, e.y, t.y), this.z = K(this.z, e.z, t.z), this.w = K(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = K(this.x, e, t), this.y = K(this.y, e, t), this.z = K(this.z, e, t), this.w = K(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(K(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, Bl = class extends Yc {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: hs,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1,
			useArrayDepthTexture: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new zl(0, 0, e, t), this.scissorTest = !1, this.viewport = new zl(0, 0, e, t), this.textures = [];
		let r = new Rl({
			width: e,
			height: t,
			depth: n.depth
		}), i = n.count;
		for (let e = 0; e < i; e++) this.textures[e] = r.clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: hs,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new Pl(n);
		}
		return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Vl = class extends Bl {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, Hl = class extends Rl {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = fs, this.minFilter = fs, this.wrapR = us, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, Ul = class extends Rl {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = fs, this.minFilter = fs, this.wrapR = us, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Wl = class e {
	static {
		e.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / Gl.setFromMatrixColumn(e, 0).length(), i = 1 / Gl.setFromMatrixColumn(e, 1).length(), a = 1 / Gl.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(ql, e, Jl);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return Zl.subVectors(e, t), Zl.lengthSq() === 0 && (Zl.z = 1), Zl.normalize(), Yl.crossVectors(n, Zl), Yl.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Zl.x += 1e-4 : Zl.z += 1e-4, Zl.normalize(), Yl.crossVectors(n, Zl)), Yl.normalize(), Xl.crossVectors(Zl, Yl), r[0] = Yl.x, r[4] = Xl.x, r[8] = Zl.x, r[1] = Yl.y, r[5] = Xl.y, r[9] = Zl.y, r[2] = Yl.z, r[6] = Xl.z, r[10] = Zl.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], ee = r[10], te = r[14], j = r[3], ne = r[7], M = r[11], N = r[15];
		return i[0] = a * x + o * T + s * k + c * j, i[4] = a * S + o * E + s * A + c * ne, i[8] = a * C + o * D + s * ee + c * M, i[12] = a * w + o * O + s * te + c * N, i[1] = l * x + u * T + d * k + f * j, i[5] = l * S + u * E + d * A + f * ne, i[9] = l * C + u * D + d * ee + f * M, i[13] = l * w + u * O + d * te + f * N, i[2] = p * x + m * T + h * k + g * j, i[6] = p * S + m * E + h * A + g * ne, i[10] = p * C + m * D + h * ee + g * M, i[14] = p * w + m * O + h * te + g * N, i[3] = _ * x + v * T + y * k + b * j, i[7] = _ * S + v * E + y * A + b * ne, i[11] = _ * C + v * D + y * ee + b * M, i[15] = _ * w + v * O + y * te + b * N, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = Gl.set(r[0], r[1], r[2]).length(), o = Gl.set(r[4], r[5], r[6]).length(), s = Gl.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), Kl.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return Kl.elements[0] *= c, Kl.elements[1] *= c, Kl.elements[2] *= c, Kl.elements[4] *= l, Kl.elements[5] *= l, Kl.elements[6] *= l, Kl.elements[8] *= u, Kl.elements[9] *= u, Kl.elements[10] *= u, t.setFromRotationMatrix(Kl), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = Lc, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = Lc, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, Gl = /*@__PURE__*/ new J(), Kl = /*@__PURE__*/ new Wl(), ql = /*@__PURE__*/ new J(0, 0, 0), Jl = /*@__PURE__*/ new J(1, 1, 1), Yl = /*@__PURE__*/ new J(), Xl = /*@__PURE__*/ new J(), Zl = /*@__PURE__*/ new J(), Ql = /*@__PURE__*/ new Wl(), $l = /*@__PURE__*/ new Sl(), eu = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(K(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-K(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(K(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-K(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(K(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-K(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: W("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return Ql.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ql, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return $l.setFromEuler(this), this.setFromQuaternion($l, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
eu.DEFAULT_ORDER = "XYZ";
var tu = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = (1 << e | 0) >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e | 0;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e | 0;
	}
	disable(e) {
		this.mask &= ~(1 << e | 0);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return (this.mask & (1 << e | 0)) != 0;
	}
}, nu = 0, ru = /*@__PURE__*/ new J(), iu = /*@__PURE__*/ new Sl(), au = /*@__PURE__*/ new Wl(), ou = /*@__PURE__*/ new J(), su = /*@__PURE__*/ new J(), cu = /*@__PURE__*/ new J(), lu = /*@__PURE__*/ new Sl(), uu = /*@__PURE__*/ new J(1, 0, 0), du = /*@__PURE__*/ new J(0, 1, 0), fu = /*@__PURE__*/ new J(0, 0, 1), pu = { type: "added" }, mu = { type: "removed" }, hu = {
	type: "childadded",
	child: null
}, gu = {
	type: "childremoved",
	child: null
}, _u = class e extends Yc {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: nu++ }), this.uuid = el(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new J(), n = new eu(), r = new Sl(), i = new J(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new Wl() },
			normalMatrix: { value: new Y() }
		}), this.matrix = new Wl(), this.matrixWorld = new Wl(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new tu(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return iu.setFromAxisAngle(e, t), this.quaternion.multiply(iu), this;
	}
	rotateOnWorldAxis(e, t) {
		return iu.setFromAxisAngle(e, t), this.quaternion.premultiply(iu), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(uu, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(du, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(fu, e);
	}
	translateOnAxis(e, t) {
		return ru.copy(e).applyQuaternion(this.quaternion), this.position.add(ru.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(uu, e);
	}
	translateY(e) {
		return this.translateOnAxis(du, e);
	}
	translateZ(e) {
		return this.translateOnAxis(fu, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(au.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? ou.copy(e) : ou.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), su.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? au.lookAt(su, ou, this.up) : au.lookAt(ou, su, this.up), this.quaternion.setFromRotationMatrix(au), r && (au.extractRotation(r.matrixWorld), iu.setFromRotationMatrix(au), this.quaternion.premultiply(iu.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (G("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(pu), hu.child = e, this.dispatchEvent(hu), hu.child = null) : G("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(mu), gu.child = e, this.dispatchEvent(gu), gu.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), au.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), au.multiply(e.parent.matrixWorld)), e.applyMatrix4(au), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(pu), hu.child = e, this.dispatchEvent(hu), hu.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(su, e, cu), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(su, lu, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
			let t = [];
			for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
			r.material = t;
		} else r.material = i(e.materials, this.material);
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
};
_u.DEFAULT_UP = /*@__PURE__*/ new J(0, 1, 0), _u.DEFAULT_MATRIX_AUTO_UPDATE = !0, _u.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var vu = class extends _u {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, yu = { type: "move" }, bu = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new vu(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new vu(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new J(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new J()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new vu(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new J(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new J(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(yu)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new vu();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, xu = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, Su = {
	h: 0,
	s: 0,
	l: 0
}, Cu = {
	h: 0,
	s: 0,
	l: 0
};
function wu(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var Z = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = jc) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, X.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = X.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, X.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = X.workingColorSpace) {
		if (e = tl(e, 1), t = K(t, 0, 1), n = K(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = wu(i, r, e + 1 / 3), this.g = wu(i, r, e), this.b = wu(i, r, e - 1 / 3);
		}
		return X.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = jc) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && W("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: W("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			W("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = jc) {
		let n = xu[e.toLowerCase()];
		return n === void 0 ? W("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = kl(e.r), this.g = kl(e.g), this.b = kl(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = Al(e.r), this.g = Al(e.g), this.b = Al(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = jc) {
		return X.workingToColorSpace(Tu.copy(this), e), Math.round(K(Tu.r * 255, 0, 255)) * 65536 + Math.round(K(Tu.g * 255, 0, 255)) * 256 + Math.round(K(Tu.b * 255, 0, 255));
	}
	getHexString(e = jc) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = X.workingColorSpace) {
		X.workingToColorSpace(Tu.copy(this), t);
		let n = Tu.r, r = Tu.g, i = Tu.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i:
					s = (n - r) / e + 4;
					break;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = X.workingColorSpace) {
		return X.workingToColorSpace(Tu.copy(this), t), e.r = Tu.r, e.g = Tu.g, e.b = Tu.b, e;
	}
	getStyle(e = jc) {
		X.workingToColorSpace(Tu.copy(this), e);
		let t = Tu.r, n = Tu.g, r = Tu.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(Su), this.setHSL(Su.h + e, Su.s + t, Su.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(Su), e.getHSL(Cu);
		let n = il(Su.h, Cu.h, t), r = il(Su.s, Cu.s, t), i = il(Su.l, Cu.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, Tu = /*@__PURE__*/ new Z();
Z.NAMES = xu;
var Eu = class extends _u {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new eu(), this.environmentIntensity = 1, this.environmentRotation = new eu(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, Du = /*@__PURE__*/ new J(), Ou = /*@__PURE__*/ new J(), ku = /*@__PURE__*/ new J(), Au = /*@__PURE__*/ new J(), ju = /*@__PURE__*/ new J(), Mu = /*@__PURE__*/ new J(), Nu = /*@__PURE__*/ new J(), Pu = /*@__PURE__*/ new J(), Fu = /*@__PURE__*/ new J(), Iu = /*@__PURE__*/ new J(), Lu = /*@__PURE__*/ new zl(), Ru = /*@__PURE__*/ new zl(), zu = /*@__PURE__*/ new zl(), Bu = class e {
	constructor(e = new J(), t = new J(), n = new J()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), Du.subVectors(e, t), r.cross(Du);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		Du.subVectors(r, t), Ou.subVectors(n, t), ku.subVectors(e, t);
		let a = Du.dot(Du), o = Du.dot(Ou), s = Du.dot(ku), c = Ou.dot(Ou), l = Ou.dot(ku), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, Au) === null ? !1 : Au.x >= 0 && Au.y >= 0 && Au.x + Au.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, Au) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Au.x), s.addScaledVector(a, Au.y), s.addScaledVector(o, Au.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return Lu.setScalar(0), Ru.setScalar(0), zu.setScalar(0), Lu.fromBufferAttribute(e, t), Ru.fromBufferAttribute(e, n), zu.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Lu, i.x), a.addScaledVector(Ru, i.y), a.addScaledVector(zu, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return Du.subVectors(n, t), Ou.subVectors(e, t), Du.cross(Ou).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return Du.subVectors(this.c, this.b), Ou.subVectors(this.a, this.b), Du.cross(Ou).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		ju.subVectors(r, n), Mu.subVectors(i, n), Pu.subVectors(e, n);
		let s = ju.dot(Pu), c = Mu.dot(Pu);
		if (s <= 0 && c <= 0) return t.copy(n);
		Fu.subVectors(e, r);
		let l = ju.dot(Fu), u = Mu.dot(Fu);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0) return a = s / (s - l), t.copy(n).addScaledVector(ju, a);
		Iu.subVectors(e, i);
		let f = ju.dot(Iu), p = Mu.dot(Iu);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Mu, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return Nu.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(Nu, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(ju, a).addScaledVector(Mu, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, Vu = class {
	constructor(e = new J(Infinity, Infinity, Infinity), t = new J(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Uu.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Uu.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = Uu.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, Uu) : Uu.fromBufferAttribute(r, t), Uu.applyMatrix4(e.matrixWorld), this.expandByPoint(Uu);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), Wu.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), Wu.copy(e.boundingBox)), Wu.applyMatrix4(e.matrixWorld), this.union(Wu);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, Uu), Uu.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(Zu), Qu.subVectors(this.max, Zu), Gu.subVectors(e.a, Zu), Ku.subVectors(e.b, Zu), qu.subVectors(e.c, Zu), Ju.subVectors(Ku, Gu), Yu.subVectors(qu, Ku), Xu.subVectors(Gu, qu);
		let t = [
			0,
			-Ju.z,
			Ju.y,
			0,
			-Yu.z,
			Yu.y,
			0,
			-Xu.z,
			Xu.y,
			Ju.z,
			0,
			-Ju.x,
			Yu.z,
			0,
			-Yu.x,
			Xu.z,
			0,
			-Xu.x,
			-Ju.y,
			Ju.x,
			0,
			-Yu.y,
			Yu.x,
			0,
			-Xu.y,
			Xu.x,
			0
		];
		return !td(t, Gu, Ku, qu, Qu) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !td(t, Gu, Ku, qu, Qu)) ? !1 : ($u.crossVectors(Ju, Yu), t = [
			$u.x,
			$u.y,
			$u.z
		], td(t, Gu, Ku, qu, Qu));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, Uu).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Uu).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() ? this : (Hu[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Hu[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Hu[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Hu[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Hu[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Hu[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Hu[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Hu[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Hu), this);
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, Hu = [
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J(),
	/*@__PURE__*/ new J()
], Uu = /*@__PURE__*/ new J(), Wu = /*@__PURE__*/ new Vu(), Gu = /*@__PURE__*/ new J(), Ku = /*@__PURE__*/ new J(), qu = /*@__PURE__*/ new J(), Ju = /*@__PURE__*/ new J(), Yu = /*@__PURE__*/ new J(), Xu = /*@__PURE__*/ new J(), Zu = /*@__PURE__*/ new J(), Qu = /*@__PURE__*/ new J(), $u = /*@__PURE__*/ new J(), ed = /*@__PURE__*/ new J();
function td(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		ed.fromArray(e, a);
		let o = i.x * Math.abs(ed.x) + i.y * Math.abs(ed.y) + i.z * Math.abs(ed.z), s = t.dot(ed), c = n.dot(ed), l = r.dot(ed);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var nd = /*@__PURE__*/ new J(), rd = /*@__PURE__*/ new q(), id = 0, ad = class extends Yc {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: id++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = Ic, this.updateRanges = [], this.gpuType = ws, this.version = 0;
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) rd.fromBufferAttribute(this, t), rd.applyMatrix3(e), this.setXY(t, rd.x, rd.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) nd.fromBufferAttribute(this, t), nd.applyMatrix3(e), this.setXYZ(t, nd.x, nd.y, nd.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) nd.fromBufferAttribute(this, t), nd.applyMatrix4(e), this.setXYZ(t, nd.x, nd.y, nd.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) nd.fromBufferAttribute(this, t), nd.applyNormalMatrix(e), this.setXYZ(t, nd.x, nd.y, nd.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) nd.fromBufferAttribute(this, t), nd.transformDirection(e), this.setXYZ(t, nd.x, nd.y, nd.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = yl(n, this.array)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = bl(n, this.array)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = yl(t, this.array)), t;
	}
	setX(e, t) {
		return this.normalized && (t = bl(t, this.array)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = yl(t, this.array)), t;
	}
	setY(e, t) {
		return this.normalized && (t = bl(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = yl(t, this.array)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = bl(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = yl(t, this.array)), t;
	}
	setW(e, t) {
		return this.normalized && (t = bl(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = bl(t, this.array), n = bl(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = bl(t, this.array), n = bl(n, this.array), r = bl(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = bl(t, this.array), n = bl(n, this.array), r = bl(r, this.array), i = bl(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, od = class extends ad {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, sd = class extends ad {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, cd = class extends ad {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, ld = /*@__PURE__*/ new Vu(), ud = /*@__PURE__*/ new J(), dd = /*@__PURE__*/ new J(), fd = class {
	constructor(e = new J(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? ld.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		ud.subVectors(e, this.center);
		let t = ud.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(ud, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (dd.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(ud.copy(e.center).add(dd)), this.expandByPoint(ud.copy(e.center).sub(dd))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, pd = 0, md = /*@__PURE__*/ new Wl(), hd = /*@__PURE__*/ new _u(), gd = /*@__PURE__*/ new J(), _d = /*@__PURE__*/ new Vu(), vd = /*@__PURE__*/ new Vu(), yd = /*@__PURE__*/ new J(), bd = class e extends Yc {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: pd++ }), this.uuid = el(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return Array.isArray(e) ? this.index = new (Rc(e) ? sd : od)(e, 1) : this.index = e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new Y().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return md.makeRotationFromQuaternion(e), this.applyMatrix4(md), this;
	}
	rotateX(e) {
		return md.makeRotationX(e), this.applyMatrix4(md), this;
	}
	rotateY(e) {
		return md.makeRotationY(e), this.applyMatrix4(md), this;
	}
	rotateZ(e) {
		return md.makeRotationZ(e), this.applyMatrix4(md), this;
	}
	translate(e, t, n) {
		return md.makeTranslation(e, t, n), this.applyMatrix4(md), this;
	}
	scale(e, t, n) {
		return md.makeScale(e, t, n), this.applyMatrix4(md), this;
	}
	lookAt(e) {
		return hd.lookAt(e), hd.updateMatrix(), this.applyMatrix4(hd.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(gd).negate(), this.translate(gd.x, gd.y, gd.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new cd(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && W("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Vu());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			G("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new J(-Infinity, -Infinity, -Infinity), new J(Infinity, Infinity, Infinity));
			return;
		}
		if (e !== void 0) {
			if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				_d.setFromBufferAttribute(n), this.morphTargetsRelative ? (yd.addVectors(this.boundingBox.min, _d.min), this.boundingBox.expandByPoint(yd), yd.addVectors(this.boundingBox.max, _d.max), this.boundingBox.expandByPoint(yd)) : (this.boundingBox.expandByPoint(_d.min), this.boundingBox.expandByPoint(_d.max));
			}
		} else this.boundingBox.makeEmpty();
		(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && G("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new fd());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			G("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new J(), Infinity);
			return;
		}
		if (e) {
			let n = this.boundingSphere.center;
			if (_d.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				vd.setFromBufferAttribute(n), this.morphTargetsRelative ? (yd.addVectors(_d.min, vd.min), _d.expandByPoint(yd), yd.addVectors(_d.max, vd.max), _d.expandByPoint(yd)) : (_d.expandByPoint(vd.min), _d.expandByPoint(vd.max));
			}
			_d.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) yd.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(yd));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) yd.fromBufferAttribute(a, t), o && (gd.fromBufferAttribute(e, t), yd.add(gd)), r = Math.max(r, n.distanceToSquared(yd));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && G("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			G("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new ad(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [];
		for (let e = 0; e < n.count; e++) o[e] = new J(), s[e] = new J();
		let c = new J(), l = new J(), u = new J(), d = new q(), f = new q(), p = new q(), m = new J(), h = new J();
		function g(e, t, r) {
			c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), f.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), f.sub(d), p.sub(d);
			let a = 1 / (f.x * p.y - p.x * f.y);
			isFinite(a) && (m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a), h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a), o[e].add(m), o[t].add(m), o[r].add(m), s[e].add(h), s[t].add(h), s[r].add(h));
		}
		let _ = this.groups;
		_.length === 0 && (_ = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) g(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let v = new J(), y = new J(), b = new J(), x = new J();
		function S(e) {
			b.fromBufferAttribute(r, e), x.copy(b);
			let t = o[e];
			v.copy(t), v.sub(b.multiplyScalar(b.dot(t))).normalize(), y.crossVectors(x, t);
			let n = y.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, v.x, v.y, v.z, n);
		}
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) S(e.getX(t + 0)), S(e.getX(t + 1)), S(e.getX(t + 2));
		}
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new ad(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new J(), i = new J(), a = new J(), o = new J(), s = new J(), c = new J(), l = new J(), u = new J();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) yd.fromBufferAttribute(e, t), yd.normalize(), e.setXYZ(t, yd.x, yd.y, yd.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new ad(a, r, i);
		}
		if (this.index === null) return W("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, xd = 0, Sd = class extends Yc {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: xd++ }), this.uuid = el(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Z(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Fc, this.stencilZFail = Fc, this.stencilZPass = Fc, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				W(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				W(`Material: '${t}' is not a property of THREE.${this.type}.`);
				continue;
			}
			r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== Infinity && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Z().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new q().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new q().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Cd = /*@__PURE__*/ new J(), wd = /*@__PURE__*/ new J(), Td = /*@__PURE__*/ new J(), Ed = /*@__PURE__*/ new J(), Dd = /*@__PURE__*/ new J(), Od = /*@__PURE__*/ new J(), kd = /*@__PURE__*/ new J(), Ad = class {
	constructor(e = new J(), t = new J(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, Cd)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = Cd.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (Cd.copy(this.origin).addScaledVector(this.direction, t), Cd.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		wd.copy(e).add(t).multiplyScalar(.5), Td.copy(t).sub(e).normalize(), Ed.copy(this.origin).sub(wd);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(Td), o = Ed.dot(this.direction), s = -Ed.dot(Td), c = Ed.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) if (d >= -p) if (d <= p) {
			let e = 1 / l;
			u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
		} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(wd).addScaledVector(Td, d), f;
	}
	intersectSphere(e, t) {
		Cd.subVectors(e.center, this.origin);
		let n = Cd.dot(this.direction), r = Cd.dot(Cd) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, Cd) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		Dd.subVectors(t, e), Od.subVectors(n, e), kd.crossVectors(Dd, Od);
		let a = this.direction.dot(kd), o;
		if (a > 0) {
			if (r) return null;
			o = 1;
		} else if (a < 0) o = -1, a = -a;
		else return null;
		Ed.subVectors(this.origin, e);
		let s = o * this.direction.dot(Od.crossVectors(Ed, Od));
		if (s < 0) return null;
		let c = o * this.direction.dot(Dd.cross(Ed));
		if (c < 0 || s + c > a) return null;
		let l = -o * Ed.dot(kd);
		return l < 0 ? null : this.at(l / a, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, jd = class extends Sd {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Z(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new eu(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, Md = /*@__PURE__*/ new Wl(), Nd = /*@__PURE__*/ new Ad(), Pd = /*@__PURE__*/ new fd(), Fd = /*@__PURE__*/ new J(), Id = /*@__PURE__*/ new J(), Ld = /*@__PURE__*/ new J(), Rd = /*@__PURE__*/ new J(), zd = /*@__PURE__*/ new J(), Bd = /*@__PURE__*/ new J(), Vd = /*@__PURE__*/ new J(), Hd = /*@__PURE__*/ new J(), Ud = class extends _u {
	constructor(e = new bd(), t = new jd()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			Bd.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (zd.fromBufferAttribute(s, e), a ? Bd.addScaledVector(zd, r) : Bd.addScaledVector(zd.sub(t), r));
			}
			t.add(Bd);
		}
		return t;
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Pd.copy(n.boundingSphere), Pd.applyMatrix4(i), Nd.copy(e.ray).recast(e.near), !(Pd.containsPoint(Nd.origin) === !1 && (Nd.intersectSphere(Pd, Fd) === null || Nd.origin.distanceToSquared(Fd) > (e.far - e.near) ** 2)) && (Md.copy(i).invert(), Nd.copy(e.ray).applyMatrix4(Md), !(n.boundingBox !== null && Nd.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Nd)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
			let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
			for (let i = m, a = h; i < a; i += 3) {
				let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
				r = Gd(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
			}
		}
		else {
			let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
			for (let d = i, f = s; d < f; d += 3) {
				let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
				r = Gd(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
			}
		}
		else if (s !== void 0) if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
			let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
			for (let i = m, a = h; i < a; i += 3) {
				let a = i, s = i + 1, d = i + 2;
				r = Gd(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
			}
		}
		else {
			let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
			for (let s = i, d = o; s < d; s += 3) {
				let i = s, o = s + 1, d = s + 2;
				r = Gd(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
			}
		}
	}
};
function Wd(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	Hd.copy(s), Hd.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(Hd);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: Hd.clone(),
		object: e
	};
}
function Gd(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, Id), e.getVertexPosition(c, Ld), e.getVertexPosition(l, Rd);
	let u = Wd(e, t, n, r, Id, Ld, Rd, Vd);
	if (u) {
		let e = new J();
		Bu.getBarycoord(Vd, Id, Ld, Rd, e), i && (u.uv = Bu.getInterpolatedAttribute(i, s, c, l, e, new q())), a && (u.uv1 = Bu.getInterpolatedAttribute(a, s, c, l, e, new q())), o && (u.normal = Bu.getInterpolatedAttribute(o, s, c, l, e, new J()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new J(),
			materialIndex: 0
		};
		Bu.getNormal(Id, Ld, Rd, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var Kd = class extends Rl {
	constructor(e = null, t = 1, n = 1, r, i, a, o, s, c = fs, l = fs, u, d) {
		super(null, a, o, s, c, l, r, i, u, d), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, qd = /*@__PURE__*/ new J(), Jd = /*@__PURE__*/ new J(), Yd = /*@__PURE__*/ new Y(), Xd = class {
	constructor(e = new J(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = qd.subVectors(n, t).cross(Jd.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(qd), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || Yd.getNormalMatrix(e), r = this.coplanarPoint(qd).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Zd = /*@__PURE__*/ new fd(), Qd = /*@__PURE__*/ new q(.5, .5), $d = /*@__PURE__*/ new J(), ef = class {
	constructor(e = new Xd(), t = new Xd(), n = new Xd(), r = new Xd(), i = new Xd(), a = new Xd()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = Lc, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), Zd.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), Zd.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(Zd);
	}
	intersectsSprite(e) {
		return Zd.center.set(0, 0, 0), Zd.radius = .7071067811865476 + Qd.distanceTo(e.center), Zd.applyMatrix4(e.matrixWorld), this.intersectsSphere(Zd);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if ($d.x = r.normal.x > 0 ? e.max.x : e.min.x, $d.y = r.normal.y > 0 ? e.max.y : e.min.y, $d.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint($d) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, tf = class extends Rl {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, nf = class extends Rl {
	constructor(e, t, n = Cs, r, i, a, o = fs, s = fs, c, l = Ps, u = 1) {
		if (l !== 1026 && l !== 1027) throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: u
		}, r, i, a, o, s, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new Pl(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
	}
}, rf = class extends nf {
	constructor(e, t = Cs, n = 301, r, i, a = fs, o = fs, s, c = Ps) {
		let l = {
			width: e,
			height: e,
			depth: 1
		}, u = [
			l,
			l,
			l,
			l,
			l,
			l
		];
		super(e, e, t, n, r, i, a, o, s, c), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, af = class extends Rl {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, of = class e extends bd {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new cd(c, 3)), this.setAttribute("normal", new cd(l, 3)), this.setAttribute("uv", new cd(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new J();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, sf = class e extends bd {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new cd(p, 3)), this.setAttribute("normal", new cd(m, 3)), this.setAttribute("uv", new cd(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
};
function cf(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (uf(i)) i.isRenderTargetTexture ? (W("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) if (uf(i[0])) {
				let e = [];
				for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
				t[n][r] = e;
			} else t[n][r] = i.slice();
			else t[n][r] = i;
		}
	}
	return t;
}
function lf(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = cf(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function uf(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function df(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function ff(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : X.workingColorSpace;
}
var pf = {
	clone: cf,
	merge: lf
}, mf = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", hf = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", gf = class extends Sd {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = mf, this.fragmentShader = hf, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = cf(e.uniforms), this.uniformsGroups = df(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new Z().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new q().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new J().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new zl().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new Y().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new Wl().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, _f = class extends gf {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, vf = class extends Sd {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Ac, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, yf = class extends Sd {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function bf(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var xf = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, Sf = class extends xf {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: Dc,
			endingEnd: Dc
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case Oc:
				i = e, o = 2 * t - n;
				break;
			case kc:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case Oc:
				a = e, s = 2 * n - t;
				break;
			case kc:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, Cf = class extends xf {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, wf = class extends xf {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, Tf = class extends xf {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = (n - t) / (r - t), S, C, w, T, E;
			for (let e = 0; e < 8; e++) {
				S = x * x, C = S * x, w = 1 - x, T = w * w, E = T * w;
				let e = E * t + 3 * T * x * g + 3 * w * S * y + C * r - n;
				if (Math.abs(e) < 1e-10) break;
				let i = 3 * T * (g - t) + 6 * w * x * (y - g) + 3 * S * (r - y);
				if (Math.abs(i) < 1e-10) break;
				x -= e / i, x = Math.max(0, Math.min(1, x));
			}
			i[p] = E * o + 3 * T * x * _ + 3 * w * S * b + C * m;
		}
		return i;
	}
}, Ef = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = bf(t, this.TimeBufferType), this.values = bf(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: bf(e.times, Array),
				values: bf(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t);
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new wf(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Cf(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new Sf(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new Tf(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case Cc:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case wc:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case Tc:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case Ec:
				t = this.InterpolantFactoryMethodBezier;
				break;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
			else throw Error(t);
			return W("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return Cc;
			case this.InterpolantFactoryMethodLinear: return wc;
			case this.InterpolantFactoryMethodSmooth: return Tc;
			case this.InterpolantFactoryMethodBezier: return Ec;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (G("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (G("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				G("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				G("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && zc(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				G("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === Tc, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) if (r) i = !0;
			else {
				let e = o * n, r = e - n, a = e + n;
				for (let o = 0; o !== n; ++o) {
					let n = t[e + o];
					if (n !== t[r + o] || n !== t[a + o]) {
						i = !0;
						break;
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, r;
	}
};
Ef.prototype.ValueTypeName = "", Ef.prototype.TimeBufferType = Float32Array, Ef.prototype.ValueBufferType = Float32Array, Ef.prototype.DefaultInterpolation = wc;
var Df = class extends Ef {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Df.prototype.ValueTypeName = "bool", Df.prototype.ValueBufferType = Array, Df.prototype.DefaultInterpolation = Cc, Df.prototype.InterpolantFactoryMethodLinear = void 0, Df.prototype.InterpolantFactoryMethodSmooth = void 0;
var Of = class extends Ef {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Of.prototype.ValueTypeName = "color";
var kf = class extends Ef {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
kf.prototype.ValueTypeName = "number";
var Af = class extends xf {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) Sl.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, jf = class extends Ef {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Af(this.times, this.values, this.getValueSize(), e);
	}
};
jf.prototype.ValueTypeName = "quaternion", jf.prototype.InterpolantFactoryMethodSmooth = void 0;
var Mf = class extends Ef {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Mf.prototype.ValueTypeName = "string", Mf.prototype.ValueBufferType = Array, Mf.prototype.DefaultInterpolation = Cc, Mf.prototype.InterpolantFactoryMethodLinear = void 0, Mf.prototype.InterpolantFactoryMethodSmooth = void 0;
var Nf = class extends Ef {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Nf.prototype.ValueTypeName = "vector";
var Pf = {
	enabled: !1,
	files: {},
	add: function(e, t) {
		this.enabled !== !1 && (Ff(e) || (this.files[e] = t));
	},
	get: function(e) {
		if (this.enabled !== !1 && !Ff(e)) return this.files[e];
	},
	remove: function(e) {
		delete this.files[e];
	},
	clear: function() {
		this.files = {};
	}
};
function Ff(e) {
	try {
		let t = e.slice(e.indexOf(":") + 1);
		return new URL(t).protocol === "blob:";
	} catch {
		return !1;
	}
}
var If = /*@__PURE__*/ new class {
	constructor(e, t, n) {
		let r = this, i = !1, a = 0, o = 0, s, c = [];
		this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(e) {
			o++, i === !1 && r.onStart !== void 0 && r.onStart(e, a, o), i = !0;
		}, this.itemEnd = function(e) {
			a++, r.onProgress !== void 0 && r.onProgress(e, a, o), a === o && (i = !1, r.onLoad !== void 0 && r.onLoad());
		}, this.itemError = function(e) {
			r.onError !== void 0 && r.onError(e);
		}, this.resolveURL = function(e) {
			return e = e.normalize("NFC"), s ? s(e) : e;
		}, this.setURLModifier = function(e) {
			return s = e, this;
		}, this.addHandler = function(e, t) {
			return c.push(e, t), this;
		}, this.removeHandler = function(e) {
			let t = c.indexOf(e);
			return t !== -1 && c.splice(t, 2), this;
		}, this.getHandler = function(e) {
			for (let t = 0, n = c.length; t < n; t += 2) {
				let n = c[t], r = c[t + 1];
				if (n.global && (n.lastIndex = 0), n.test(e)) return r;
			}
			return null;
		}, this.abort = function() {
			return this.abortController.abort(), this._abortController = null, this;
		};
	}
	get abortController() {
		return this._abortController ||= new AbortController(), this._abortController;
	}
}(), Lf = class {
	constructor(e) {
		this.manager = e === void 0 ? If : e, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	load() {}
	loadAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.load(e, r, t, i);
		});
	}
	parse() {}
	setCrossOrigin(e) {
		return this.crossOrigin = e, this;
	}
	setWithCredentials(e) {
		return this.withCredentials = e, this;
	}
	setPath(e) {
		return this.path = e, this;
	}
	setResourcePath(e) {
		return this.resourcePath = e, this;
	}
	setRequestHeader(e) {
		return this.requestHeader = e, this;
	}
	abort() {
		return this;
	}
};
Lf.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Rf = /* @__PURE__ */ new WeakMap(), zf = class extends Lf {
	constructor(e) {
		super(e);
	}
	load(e, t, n, r) {
		this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
		let i = this, a = Pf.get(`image:${e}`);
		if (a !== void 0) {
			if (a.complete === !0) i.manager.itemStart(e), setTimeout(function() {
				t && t(a), i.manager.itemEnd(e);
			}, 0);
			else {
				let e = Rf.get(a);
				e === void 0 && (e = [], Rf.set(a, e)), e.push({
					onLoad: t,
					onError: r
				});
			}
			return a;
		}
		let o = Bc("img");
		function s() {
			l(), t && t(this);
			let n = Rf.get(this) || [];
			for (let e = 0; e < n.length; e++) {
				let t = n[e];
				t.onLoad && t.onLoad(this);
			}
			Rf.delete(this), i.manager.itemEnd(e);
		}
		function c(t) {
			l(), r && r(t), Pf.remove(`image:${e}`);
			let n = Rf.get(this) || [];
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				r.onError && r.onError(t);
			}
			Rf.delete(this), i.manager.itemError(e), i.manager.itemEnd(e);
		}
		function l() {
			o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1);
		}
		return o.addEventListener("load", s, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), Pf.add(`image:${e}`, o), i.manager.itemStart(e), o.src = e, o;
	}
}, Bf = class extends Lf {
	constructor(e) {
		super(e);
	}
	load(e, t, n, r) {
		let i = new Rl(), a = new zf(this.manager);
		return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(e) {
			i.image = e, i.needsUpdate = !0, t !== void 0 && t(i);
		}, n, r), i;
	}
}, Vf = /*@__PURE__*/ new J(), Hf = /*@__PURE__*/ new Sl(), Uf = /*@__PURE__*/ new J(), Wf = class extends _u {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Wl(), this.projectionMatrix = new Wl(), this.projectionMatrixInverse = new Wl(), this.coordinateSystem = Lc, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(Vf, Hf, Uf), Uf.x === 1 && Uf.y === 1 && Uf.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Vf, Hf, Uf.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(Vf, Hf, Uf), Uf.x === 1 && Uf.y === 1 && Uf.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Vf, Hf, Uf.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Gf = /*@__PURE__*/ new J(), Kf = /*@__PURE__*/ new q(), qf = /*@__PURE__*/ new q(), Jf = class extends Wf {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = $c * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(Qc * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return $c * 2 * Math.atan(Math.tan(Qc * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		Gf.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(Gf.x, Gf.y).multiplyScalar(-e / Gf.z), Gf.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(Gf.x, Gf.y).multiplyScalar(-e / Gf.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, Kf, qf), t.subVectors(qf, Kf);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(Qc * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, Yf = class extends Wf {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, Xf = -90, Zf = 1, Qf = class extends _u {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new Jf(Xf, Zf, e, t);
		r.layers = this.layers, this.add(r);
		let i = new Jf(Xf, Zf, e, t);
		i.layers = this.layers, this.add(i);
		let a = new Jf(Xf, Zf, e, t);
		a.layers = this.layers, this.add(a);
		let o = new Jf(Xf, Zf, e, t);
		o.layers = this.layers, this.add(o);
		let s = new Jf(Xf, Zf, e, t);
		s.layers = this.layers, this.add(s);
		let c = new Jf(Xf, Zf, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.generateMipmaps;
		n.texture.generateMipmaps = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, $f = class extends Jf {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
	}
}, ep = "\\[\\]\\.:\\/", tp = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), np = "[^\\[\\]\\.:\\/]", rp = "[^" + ep.replace("\\.", "") + "]", ip = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", np), ap = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", rp), op = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", np), sp = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", np), cp = RegExp("^" + ip + ap + op + sp + "$"), lp = [
	"material",
	"materials",
	"bones",
	"map"
], up = class {
	constructor(e, t, n) {
		let r = n || dp.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, dp = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(tp, "");
	}
	static parseTrackName(e) {
		let t = cp.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			lp.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			W("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						G("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						G("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						G("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						G("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						G("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						G("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					G("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			G("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					G("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					G("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
dp.Composite = up, dp.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, dp.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, dp.prototype.GetterByBindingType = [
	dp.prototype._getValue_direct,
	dp.prototype._getValue_array,
	dp.prototype._getValue_arrayElement,
	dp.prototype._getValue_toArray
], dp.prototype.SetterByBindingTypeAndVersioning = [
	[
		dp.prototype._setValue_direct,
		dp.prototype._setValue_direct_setNeedsUpdate,
		dp.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		dp.prototype._setValue_array,
		dp.prototype._setValue_array_setNeedsUpdate,
		dp.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		dp.prototype._setValue_arrayElement,
		dp.prototype._setValue_arrayElement_setNeedsUpdate,
		dp.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		dp.prototype._setValue_fromArray,
		dp.prototype._setValue_fromArray_setNeedsUpdate,
		dp.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
];
var fp = class {
	constructor(e = 1, t = 0, n = 0) {
		this.radius = e, this.phi = t, this.theta = n;
	}
	set(e, t, n) {
		return this.radius = e, this.phi = t, this.theta = n, this;
	}
	copy(e) {
		return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
	}
	makeSafe() {
		let e = 1e-6;
		return this.phi = K(this.phi, e, Math.PI - e), this;
	}
	setFromVector3(e) {
		return this.setFromCartesianCoords(e.x, e.y, e.z);
	}
	setFromCartesianCoords(e, t, n) {
		return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(K(t / this.radius, -1, 1))), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
};
(class e {
	static {
		e.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
});
var pp = class extends Yc {
	constructor(e, t = null) {
		super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
			LEFT: null,
			MIDDLE: null,
			RIGHT: null
		}, this.touches = {
			ONE: null,
			TWO: null
		};
	}
	connect(e) {
		if (e === void 0) {
			W("Controls: connect() now requires an element.");
			return;
		}
		this.domElement !== null && this.disconnect(), this.domElement = e;
	}
	disconnect() {}
	dispose() {}
	update() {}
};
function mp(e, t, n, r) {
	let i = hp(r);
	switch (n) {
		case js: return e * t;
		case Is: return e * t / i.components * i.byteLength;
		case Ls: return e * t / i.components * i.byteLength;
		case Rs: return e * t * 2 / i.components * i.byteLength;
		case zs: return e * t * 2 / i.components * i.byteLength;
		case Ms: return e * t * 3 / i.components * i.byteLength;
		case Ns: return e * t * 4 / i.components * i.byteLength;
		case Bs: return e * t * 4 / i.components * i.byteLength;
		case Vs:
		case Hs: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case Us:
		case Ws: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case Ks:
		case Js: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case Gs:
		case qs: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case Ys:
		case Xs:
		case Qs:
		case $s: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case Zs:
		case ec:
		case tc: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case nc: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case rc: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case ic: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case ac: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case oc: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case sc: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case cc: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case lc: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case uc: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case dc: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case fc: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case pc: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case mc: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case hc: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case gc:
		case _c:
		case vc: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case yc:
		case bc: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case xc:
		case Sc: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function hp(e) {
	switch (e) {
		case vs:
		case ys: return {
			byteLength: 1,
			components: 1
		};
		case xs:
		case bs:
		case Ts: return {
			byteLength: 2,
			components: 1
		};
		case Es:
		case Ds: return {
			byteLength: 2,
			components: 4
		};
		case Cs:
		case Ss:
		case ws: return {
			byteLength: 4,
			components: 1
		};
		case ks:
		case As: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } })), typeof window < "u" && (window.__THREE__ ? W("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
//#endregion
//#region node_modules/.pnpm/three@0.185.0/node_modules/three/build/three.module.js
function gp() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		n(t, a), r = e.requestAnimationFrame(i);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function _p(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var Q = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n		vec3 iridescenceFresnelDielectric;\n		vec3 iridescenceFresnelMetallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\nvec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;\n	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;\n	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;\n	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;\n	float Ess_V = dfgV.x + dfgV.y;\n	float Ess_L = dfgL.x + dfgL.y;\n	float Ems_V = 1.0 - Ess_V;\n	float Ems_L = 1.0 - Ess_L;\n	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;\n	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );\n	float compensationFactor = Ems_V * Ems_L;\n	vec3 multiScatter = Fms * compensationFactor;\n	return singleScatter + multiScatter;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#ifdef USE_LIGHT_PROBES_GRID\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#ifdef USE_LIGHT_PROBES_GRID\nuniform highp sampler3D probesSH;\nuniform vec3 probesMin;\nuniform vec3 probesMax;\nuniform vec3 probesResolution;\nvec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 resMinusOne = res - 1.0;\n	vec3 probeSpacing = gridRange / resMinusOne;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );\n	uvw = uvw * resMinusOne / res + 0.5 / res;\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				float radius = shadowRadius * texelSize.x;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp -= shadowBias;\n			#else\n				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp += shadowBias;\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			vec2 sample0 = vogelDiskSample( 0, 5, phi );\n			vec2 sample1 = vogelDiskSample( 1, 5, phi );\n			vec2 sample2 = vogelDiskSample( 2, 5, phi );\n			vec2 sample3 = vogelDiskSample( 3, 5, phi );\n			vec2 sample4 = vogelDiskSample( 4, 5, phi );\n			shadow = (\n				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )\n			) * 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, $ = {
	common: {
		diffuse: { value: /*@__PURE__*/ new Z(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new Y() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new Y() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /*@__PURE__*/ new Y() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /*@__PURE__*/ new Y() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /*@__PURE__*/ new Y() },
		normalScale: { value: /*@__PURE__*/ new q(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /*@__PURE__*/ new Y() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /*@__PURE__*/ new Y() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /*@__PURE__*/ new Z(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: null },
		probesMin: { value: /*@__PURE__*/ new J() },
		probesMax: { value: /*@__PURE__*/ new J() },
		probesResolution: { value: /*@__PURE__*/ new J() }
	},
	points: {
		diffuse: { value: /*@__PURE__*/ new Z(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new Y() },
		alphaTest: { value: 0 },
		uvTransform: { value: /*@__PURE__*/ new Y() }
	},
	sprite: {
		diffuse: { value: /*@__PURE__*/ new Z(16777215) },
		opacity: { value: 1 },
		center: { value: /*@__PURE__*/ new q(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new Y() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new Y() },
		alphaTest: { value: 0 }
	}
}, vp = {
	basic: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.fog
		]),
		vertexShader: Q.meshbasic_vert,
		fragmentShader: Q.meshbasic_frag
	},
	lambert: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /*@__PURE__*/ new Z(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshlambert_vert,
		fragmentShader: Q.meshlambert_frag
	},
	phong: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /*@__PURE__*/ new Z(0) },
				specular: { value: /*@__PURE__*/ new Z(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshphong_vert,
		fragmentShader: Q.meshphong_frag
	},
	standard: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.roughnessmap,
			$.metalnessmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /*@__PURE__*/ new Z(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshphysical_vert,
		fragmentShader: Q.meshphysical_frag
	},
	toon: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.gradientmap,
			$.fog,
			$.lights,
			{ emissive: { value: /*@__PURE__*/ new Z(0) } }
		]),
		vertexShader: Q.meshtoon_vert,
		fragmentShader: Q.meshtoon_frag
	},
	matcap: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: Q.meshmatcap_vert,
		fragmentShader: Q.meshmatcap_frag
	},
	points: {
		uniforms: /*@__PURE__*/ lf([$.points, $.fog]),
		vertexShader: Q.points_vert,
		fragmentShader: Q.points_frag
	},
	dashed: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: Q.linedashed_vert,
		fragmentShader: Q.linedashed_frag
	},
	depth: {
		uniforms: /*@__PURE__*/ lf([$.common, $.displacementmap]),
		vertexShader: Q.depth_vert,
		fragmentShader: Q.depth_frag
	},
	normal: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: Q.meshnormal_vert,
		fragmentShader: Q.meshnormal_frag
	},
	sprite: {
		uniforms: /*@__PURE__*/ lf([$.sprite, $.fog]),
		vertexShader: Q.sprite_vert,
		fragmentShader: Q.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /*@__PURE__*/ new Y() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: Q.background_vert,
		fragmentShader: Q.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /*@__PURE__*/ new Y() }
		},
		vertexShader: Q.backgroundCube_vert,
		fragmentShader: Q.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: Q.cube_vert,
		fragmentShader: Q.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: Q.equirect_vert,
		fragmentShader: Q.equirect_frag
	},
	distance: {
		uniforms: /*@__PURE__*/ lf([
			$.common,
			$.displacementmap,
			{
				referencePosition: { value: /*@__PURE__*/ new J() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: Q.distance_vert,
		fragmentShader: Q.distance_frag
	},
	shadow: {
		uniforms: /*@__PURE__*/ lf([
			$.lights,
			$.fog,
			{
				color: { value: /*@__PURE__*/ new Z(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: Q.shadow_vert,
		fragmentShader: Q.shadow_frag
	}
};
vp.physical = {
	uniforms: /*@__PURE__*/ lf([vp.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /*@__PURE__*/ new Y() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /*@__PURE__*/ new Y() },
		clearcoatNormalScale: { value: /*@__PURE__*/ new q(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new Y() },
		dispersion: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /*@__PURE__*/ new Y() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new Y() },
		sheen: { value: 0 },
		sheenColor: { value: /*@__PURE__*/ new Z(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /*@__PURE__*/ new Y() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /*@__PURE__*/ new Y() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /*@__PURE__*/ new Y() },
		transmissionSamplerSize: { value: /*@__PURE__*/ new q() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /*@__PURE__*/ new Y() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /*@__PURE__*/ new Z(0) },
		specularColor: { value: /*@__PURE__*/ new Z(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /*@__PURE__*/ new Y() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /*@__PURE__*/ new Y() },
		anisotropyVector: { value: /*@__PURE__*/ new q() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /*@__PURE__*/ new Y() }
	}]),
	vertexShader: Q.meshphysical_vert,
	fragmentShader: Q.meshphysical_frag
};
var yp = {
	r: 0,
	b: 0,
	g: 0
}, bp = /*@__PURE__*/ new Wl(), xp = /*@__PURE__*/ new Y();
xp.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Sp(e, t, n, r, i, a) {
	let o = new Z(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && (i.isCubeTexture || i.mapping === 306) ? (l === void 0 && (l = new Ud(new of(1, 1, 1), new gf({
			name: "BackgroundCubeMaterial",
			uniforms: cf(vp.backgroundCube.uniforms),
			vertexShader: vp.backgroundCube.vertexShader,
			fragmentShader: vp.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(bp.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isCubeTexture && i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(xp), l.material.toneMapped = X.getTransfer(i.colorSpace) !== Pc, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new Ud(new sf(2, 2), new gf({
			name: "BackgroundMaterial",
			uniforms: cf(vp.background.uniforms),
			vertexShader: vp.background.vertexShader,
			fragmentShader: vp.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = X.getTransfer(i.colorSpace) !== Pc, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(yp, ff(e)), n.buffers.color.setClear(yp.r, yp.g, yp.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function Cp(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.stride, p = s.offset;
						if (t.isInstancedInterleavedBuffer) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function wp(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function Tp(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return !(t !== 1023 && r.convert(t) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && n !== 1015 && !i);
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (W("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.logarithmicDepthBuffer === !0, f = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
	n.reversedDepthBuffer === !0 && f === !1 && W("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: d,
		reversedDepthBuffer: f,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function Ep(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new Xd(), s = new Y(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var Dp = 4, Op = [
	.125,
	.215,
	.35,
	.446,
	.526,
	.582
], kp = 20, Ap = 256, jp = /*@__PURE__*/ new Yf(), Mp = /*@__PURE__*/ new Z(), Np = null, Pp = 0, Fp = 0, Ip = !1, Lp = /*@__PURE__*/ new J(), Rp = class {
	constructor(e) {
		this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = Lp } = i;
		Np = this._renderer.getRenderTarget(), Pp = this._renderer.getActiveCubeFace(), Fp = this._renderer.getActiveMipmapLevel(), Ip = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
		let s = this._allocateTargets();
		return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = Gp(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = Wp(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
	}
	_setSize(e) {
		this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = 2 ** this._lodMax;
	}
	_dispose() {
		this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
		for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
	}
	_cleanup(e) {
		this._renderer.setRenderTarget(Np, Pp, Fp), this._renderer.xr.enabled = Ip, e.scissorTest = !1, Vp(e, 0, 0, e.width, e.height);
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Np = this._renderer.getRenderTarget(), Pp = this._renderer.getActiveCubeFace(), Fp = this._renderer.getActiveMipmapLevel(), Ip = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
		let n = t || this._allocateTargets();
		return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
	}
	_allocateTargets() {
		let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
			magFilter: hs,
			minFilter: hs,
			generateMipmaps: !1,
			type: Ts,
			format: Ns,
			colorSpace: Mc,
			depthBuffer: !1
		}, r = Bp(e, t, n);
		if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
			this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Bp(e, t, n);
			let { _lodMax: r } = this;
			({lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas} = zp(r)), this._blurMaterial = Up(r, e, t), this._ggxMaterial = Hp(r, e, t);
		}
		return r;
	}
	_compileMaterial(e) {
		let t = new Ud(new bd(), e);
		this._renderer.compile(t, jp);
	}
	_sceneToCubeUV(e, t, n, r, i) {
		let a = new Jf(90, 1, t, n), o = [
			1,
			-1,
			1,
			1,
			1,
			1
		], s = [
			1,
			1,
			1,
			-1,
			-1,
			-1
		], c = this._renderer, l = c.autoClear, u = c.toneMapping;
		c.getClearColor(Mp), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(r), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ud(new of(), new jd({
			name: "PMREM.Background",
			side: 1,
			depthWrite: !1,
			depthTest: !1
		})));
		let d = this._backgroundBox, f = d.material, p = !1, m = e.background;
		m ? m.isColor && (f.color.copy(m), e.background = null, p = !0) : (f.color.copy(Mp), p = !0);
		for (let t = 0; t < 6; t++) {
			let n = t % 3;
			n === 0 ? (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x + s[t], i.y, i.z)) : n === 1 ? (a.up.set(0, 0, o[t]), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y + s[t], i.z)) : (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y, i.z + s[t]));
			let l = this._cubeSize;
			Vp(r, n * l, t > 2 ? l : 0, l, l), c.setRenderTarget(r), p && c.render(d, a), c.render(e, a);
		}
		c.toneMapping = u, c.autoClear = l, e.background = m;
	}
	_textureToCubeUV(e, t) {
		let n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
		r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Gp()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Wp());
		let i = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
		a.material = i;
		let o = i.uniforms;
		o.envMap.value = e;
		let s = this._cubeSize;
		Vp(t, 0, 0, 3 * s, 2 * s), n.setRenderTarget(t), n.render(a, jp);
	}
	_applyPMREM(e) {
		let t = this._renderer, n = t.autoClear;
		t.autoClear = !1;
		let r = this._lodMeshes.length;
		for (let t = 1; t < r; t++) this._applyGGXFilter(e, t - 1, t);
		t.autoClear = n;
	}
	_applyGGXFilter(e, t, n) {
		let r = this._renderer, i = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
		o.material = a;
		let s = a.uniforms, c = n / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - l * l) * (0 + c * 1.25), { _lodMax: d } = this, f = this._sizeLods[n], p = 3 * f * (n > d - Dp ? n - d + Dp : 0), m = 4 * (this._cubeSize - f);
		s.envMap.value = e.texture, s.roughness.value = u, s.mipInt.value = d - t, Vp(i, p, m, 3 * f, 2 * f), r.setRenderTarget(i), r.render(o, jp), s.envMap.value = i.texture, s.roughness.value = 0, s.mipInt.value = d - n, Vp(e, p, m, 3 * f, 2 * f), r.setRenderTarget(e), r.render(o, jp);
	}
	_blur(e, t, n, r, i) {
		let a = this._pingPongRenderTarget;
		this._halfBlur(e, a, t, n, r, "latitudinal", i), this._halfBlur(a, e, n, n, r, "longitudinal", i);
	}
	_halfBlur(e, t, n, r, i, a, o) {
		let s = this._renderer, c = this._blurMaterial;
		a !== "latitudinal" && a !== "longitudinal" && G("blur direction must be either latitudinal or longitudinal!");
		let l = this._lodMeshes[r];
		l.material = c;
		let u = c.uniforms, d = this._sizeLods[n] - 1, f = isFinite(i) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * kp - 1), p = i / f, m = isFinite(i) ? 1 + Math.floor(3 * p) : kp;
		m > kp && W(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${kp}`);
		let h = [], g = 0;
		for (let e = 0; e < kp; ++e) {
			let t = e / p, n = Math.exp(-t * t / 2);
			h.push(n), e === 0 ? g += n : e < m && (g += 2 * n);
		}
		for (let e = 0; e < h.length; e++) h[e] = h[e] / g;
		u.envMap.value = e.texture, u.samples.value = m, u.weights.value = h, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
		let { _lodMax: _ } = this;
		u.dTheta.value = f, u.mipInt.value = _ - n;
		let v = this._sizeLods[r];
		Vp(t, 3 * v * (r > _ - Dp ? r - _ + Dp : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), s.setRenderTarget(t), s.render(l, jp);
	}
};
function zp(e) {
	let t = [], n = [], r = [], i = e, a = e - Dp + 1 + Op.length;
	for (let o = 0; o < a; o++) {
		let a = 2 ** i;
		t.push(a);
		let s = 1 / a;
		o > e - Dp ? s = Op[o - e + Dp - 1] : o === 0 && (s = 0), n.push(s);
		let c = 1 / (a - 2), l = -c, u = 1 + c, d = [
			l,
			l,
			u,
			l,
			u,
			u,
			l,
			l,
			u,
			u,
			l,
			u
		], f = /* @__PURE__ */ new Float32Array(108), p = /* @__PURE__ */ new Float32Array(72), m = /* @__PURE__ */ new Float32Array(36);
		for (let e = 0; e < 6; e++) {
			let t = e % 3 * 2 / 3 - 1, n = e > 2 ? 0 : -1, r = [
				t,
				n,
				0,
				t + 2 / 3,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n + 1,
				0
			];
			f.set(r, 18 * e), p.set(d, 12 * e);
			let i = [
				e,
				e,
				e,
				e,
				e,
				e
			];
			m.set(i, 6 * e);
		}
		let h = new bd();
		h.setAttribute("position", new ad(f, 3)), h.setAttribute("uv", new ad(p, 2)), h.setAttribute("faceIndex", new ad(m, 1)), r.push(new Ud(h, null)), i > Dp && i--;
	}
	return {
		lodMeshes: r,
		sizeLods: t,
		sigmas: n
	};
}
function Bp(e, t, n) {
	let r = new Vl(e, t, n);
	return r.texture.mapping = 306, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r;
}
function Vp(e, t, n, r, i) {
	e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i);
}
function Hp(e, t, n) {
	return new gf({
		name: "PMREMGGXConvolution",
		defines: {
			GGX_SAMPLES: Ap,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			roughness: { value: 0 },
			mipInt: { value: 0 }
		},
		vertexShader: Kp(),
		fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float roughness;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n\n			// Van der Corput radical inverse\n			float radicalInverse_VdC(uint bits) {\n				bits = (bits << 16u) | (bits >> 16u);\n				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n				return float(bits) * 2.3283064365386963e-10; // / 0x100000000\n			}\n\n			// Hammersley sequence\n			vec2 hammersley(uint i, uint N) {\n				return vec2(float(i) / float(N), radicalInverse_VdC(i));\n			}\n\n			// GGX VNDF importance sampling (Eric Heitz 2018)\n			// \"Sampling the GGX Distribution of Visible Normals\"\n			// https://jcgt.org/published/0007/04/01/\n			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n				float alpha = roughness * roughness;\n\n				// Section 4.1: Orthonormal basis\n				vec3 T1 = vec3(1.0, 0.0, 0.0);\n				vec3 T2 = cross(V, T1);\n\n				// Section 4.2: Parameterization of projected area\n				float r = sqrt(Xi.x);\n				float phi = 2.0 * PI * Xi.y;\n				float t1 = r * cos(phi);\n				float t2 = r * sin(phi);\n				float s = 0.5 * (1.0 + V.z);\n				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n				// Section 4.3: Reprojection onto hemisphere\n				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;\n\n				// Section 3.4: Transform back to ellipsoid configuration\n				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n			}\n\n			void main() {\n				vec3 N = normalize(vOutputDirection);\n				vec3 V = N; // Assume view direction equals normal for pre-filtering\n\n				vec3 prefilteredColor = vec3(0.0);\n				float totalWeight = 0.0;\n\n				// For very low roughness, just sample the environment directly\n				if (roughness < 0.001) {\n					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n					return;\n				}\n\n				// Tangent space basis for VNDF sampling\n				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n				vec3 tangent = normalize(cross(up, N));\n				vec3 bitangent = cross(N, tangent);\n\n				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n					// Transform H back to world space\n					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n					vec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n					float NdotL = max(dot(N, L), 0.0);\n\n					if(NdotL > 0.0) {\n						// Sample environment at fixed mip level\n						// VNDF importance sampling handles the distribution filtering\n						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n						// Weight by NdotL for the split-sum approximation\n						// VNDF PDF naturally accounts for the visible microfacet distribution\n						prefilteredColor += sampleColor * NdotL;\n						totalWeight += NdotL;\n					}\n				}\n\n				if (totalWeight > 0.0) {\n					prefilteredColor = prefilteredColor / totalWeight;\n				}\n\n				gl_FragColor = vec4(prefilteredColor, 1.0);\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Up(e, t, n) {
	let r = new Float32Array(kp), i = new J(0, 1, 0);
	return new gf({
		name: "SphericalGaussianBlur",
		defines: {
			n: kp,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			samples: { value: 1 },
			weights: { value: r },
			latitudinal: { value: !1 },
			dTheta: { value: 0 },
			mipInt: { value: 0 },
			poleAxis: { value: i }
		},
		vertexShader: Kp(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform int samples;\n			uniform float weights[ n ];\n			uniform bool latitudinal;\n			uniform float dTheta;\n			uniform float mipInt;\n			uniform vec3 poleAxis;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			vec3 getSample( float theta, vec3 axis ) {\n\n				float cosTheta = cos( theta );\n				// Rodrigues' axis-angle rotation\n				vec3 sampleDirection = vOutputDirection * cosTheta\n					+ cross( axis, vOutputDirection ) * sin( theta )\n					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n				return bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n			}\n\n			void main() {\n\n				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n				}\n\n				axis = normalize( axis );\n\n				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n				for ( int i = 1; i < n; i++ ) {\n\n					if ( i >= samples ) {\n\n						break;\n\n					}\n\n					float theta = dTheta * float( i );\n					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n				}\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Wp() {
	return new gf({
		name: "EquirectangularToCubeUV",
		uniforms: { envMap: { value: null } },
		vertexShader: Kp(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Gp() {
	return new gf({
		name: "CubemapToCubeUV",
		uniforms: {
			envMap: { value: null },
			flipEnvMap: { value: -1 }
		},
		vertexShader: Kp(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Kp() {
	return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute float faceIndex;\n\n		varying vec3 vOutputDirection;\n\n		// RH coordinate system; PMREM face-indexing convention\n		vec3 getDirection( vec2 uv, float face ) {\n\n			uv = 2.0 * uv - 1.0;\n\n			vec3 direction = vec3( uv, 1.0 );\n\n			if ( face == 0.0 ) {\n\n				direction = direction.zyx; // ( 1, v, u ) pos x\n\n			} else if ( face == 1.0 ) {\n\n				direction = direction.xzy;\n				direction.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n			} else if ( face == 2.0 ) {\n\n				direction.x *= -1.0; // ( -u, v, 1 ) pos z\n\n			} else if ( face == 3.0 ) {\n\n				direction = direction.zyx;\n				direction.xz *= -1.0; // ( -1, v, -u ) neg x\n\n			} else if ( face == 4.0 ) {\n\n				direction = direction.xzy;\n				direction.xy *= -1.0; // ( -u, -1, v ) neg y\n\n			} else if ( face == 5.0 ) {\n\n				direction.z *= -1.0; // ( u, v, -1 ) neg z\n\n			}\n\n			return direction;\n\n		}\n\n		void main() {\n\n			vOutputDirection = getDirection( uv, faceIndex );\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
}
var qp = class extends Vl {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new tf(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new of(5, 5, 5), i = new gf({
			name: "CubemapFromEquirect",
			uniforms: cf(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		i.uniforms.tEquirect.value = t;
		let a = new Ud(r, i), o = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = hs), new Qf(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
};
function Jp(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) if (t.has(n)) {
				let e = t.get(n).texture;
				return s(e, n.mapping);
			} else {
				let r = n.image;
				if (r && r.height > 0) {
					let i = new qp(r.height);
					return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
				} else return null;
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new Rp(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new Rp(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function Yp(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && Kc("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function Xp(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap();
	function o(e) {
		let s = e.target;
		s.index !== null && t.remove(s.index);
		for (let e in s.attributes) t.remove(s.attributes[e]);
		s.removeEventListener("dispose", o), delete i[s.id];
		let c = a.get(s);
		c && (t.remove(c), a.delete(s)), r.releaseStatesOfGeometry(s), s.isInstancedBufferGeometry === !0 && delete s._maxInstanceCount, n.memory.geometries--;
	}
	function s(e, t) {
		return i[t.id] === !0 ? t : (t.addEventListener("dispose", o), i[t.id] = !0, n.memory.geometries++, t);
	}
	function c(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function l(e) {
		let n = [], r = e.index, i = e.attributes.position, o = 0;
		if (i === void 0) return;
		if (r !== null) {
			let e = r.array;
			o = r.version;
			for (let t = 0, r = e.length; t < r; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				n.push(r, i, i, a, a, r);
			}
		} else {
			let e = i.array;
			o = i.version;
			for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
				let e = t + 0, r = t + 1, i = t + 2;
				n.push(e, r, r, i, i, e);
			}
		}
		let s = new (i.count >= 65535 ? sd : od)(n, 1);
		s.version = o;
		let c = a.get(e);
		c && t.remove(c), a.set(e, s);
	}
	function u(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && l(e);
		} else l(e);
		return a.get(e);
	}
	return {
		get: s,
		update: c,
		getWireframeAttribute: u
	};
}
function Zp(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function Qp(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default:
				G("WebGLInfo: Unknown draw mode:", r);
				break;
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function $p(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new zl();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, l = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = l === void 0 ? 0 : l.length, d = r.get(o);
		if (d === void 0 || d.count !== u) {
			d !== void 0 && d.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], l = o.morphAttributes.color || [], f = 0;
			e === !0 && (f = 1), n === !0 && (f = 2), a === !0 && (f = 3);
			let p = o.attributes.position.count * f, m = 1;
			p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
			let h = new Float32Array(p * m * 4 * u), g = new Hl(h, p, m, u);
			g.type = ws, g.needsUpdate = !0;
			let _ = f * 4;
			for (let t = 0; t < u; t++) {
				let r = s[t], o = c[t], u = l[t], d = p * m * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * _;
					e === !0 && (i.fromBufferAttribute(r, t), h[d + s + 0] = i.x, h[d + s + 1] = i.y, h[d + s + 2] = i.z, h[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), h[d + s + 4] = i.x, h[d + s + 5] = i.y, h[d + s + 6] = i.z, h[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(u, t), h[d + s + 8] = i.x, h[d + s + 9] = i.y, h[d + s + 10] = i.z, h[d + s + 11] = u.itemSize === 4 ? i.w : 1);
				}
			}
			d = {
				count: u,
				texture: g,
				size: new q(p, m)
			}, r.set(o, d);
			function v() {
				g.dispose(), r.delete(o), o.removeEventListener("dispose", v);
			}
			o.addEventListener("dispose", v);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", d.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", d.size);
	}
	return { update: a };
}
function em(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var tm = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function nm(e, t, n, r, i, a) {
	let o = new Vl(t, n, {
		type: e,
		depthBuffer: i,
		stencilBuffer: a,
		samples: r ? 4 : 0,
		depthTexture: i ? new nf(t, n) : void 0
	}), s = new Vl(t, n, {
		type: Ts,
		depthBuffer: !1,
		stencilBuffer: !1
	}), c = new bd();
	c.setAttribute("position", new cd([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), c.setAttribute("uv", new cd([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let l = new _f({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), u = new Ud(c, l), d = new Yf(-1, 1, 1, -1, 0, 1), f = null, p = null, m = !1, h, g = null, _ = [], v = !1;
	this.setSize = function(e, t) {
		o.setSize(e, t), s.setSize(e, t);
		for (let n = 0; n < _.length; n++) {
			let r = _[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		_ = e, v = _.length > 0 && _[0].isRenderPass === !0;
		let t = o.width, n = o.height;
		for (let e = 0; e < _.length; e++) {
			let r = _[e];
			r.setSize && r.setSize(t, n);
		}
	}, this.begin = function(e, t) {
		if (m || e.toneMapping === 0 && _.length === 0) return !1;
		if (g = t, t !== null) {
			let e = t.width, n = t.height;
			(o.width !== e || o.height !== n) && this.setSize(e, n);
		}
		return v === !1 && e.setRenderTarget(o), h = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return v;
	}, this.end = function(e, t) {
		e.toneMapping = h, m = !0;
		let n = o, r = s;
		for (let i = 0; i < _.length; i++) {
			let a = _[i];
			if (a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1)) {
				let e = n;
				n = r, r = e;
			}
		}
		if (f !== e.outputColorSpace || p !== e.toneMapping) {
			f = e.outputColorSpace, p = e.toneMapping, l.defines = {}, X.getTransfer(f) === "srgb" && (l.defines.SRGB_TRANSFER = "");
			let t = tm[p];
			t && (l.defines[t] = ""), l.needsUpdate = !0;
		}
		l.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(g), e.render(u, d), g = null, m = !1;
	}, this.isCompositing = function() {
		return m;
	}, this.dispose = function() {
		o.depthTexture && o.depthTexture.dispose(), o.dispose(), s.dispose(), c.dispose(), l.dispose();
	};
}
var rm = /*@__PURE__*/ new Rl(), im = /*@__PURE__*/ new nf(1, 1), am = /*@__PURE__*/ new Hl(), om = /*@__PURE__*/ new Ul(), sm = /*@__PURE__*/ new tf(), cm = [], lm = [], um = /* @__PURE__ */ new Float32Array(16), dm = /* @__PURE__ */ new Float32Array(9), fm = /* @__PURE__ */ new Float32Array(4);
function pm(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = cm[i];
	if (a === void 0 && (a = new Float32Array(i), cm[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function mm(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function hm(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function gm(e, t) {
	let n = lm[t];
	n === void 0 && (n = new Int32Array(t), lm[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function _m(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function vm(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (mm(n, t)) return;
		e.uniform2fv(this.addr, t), hm(n, t);
	}
}
function ym(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (mm(n, t)) return;
		e.uniform3fv(this.addr, t), hm(n, t);
	}
}
function bm(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (mm(n, t)) return;
		e.uniform4fv(this.addr, t), hm(n, t);
	}
}
function xm(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (mm(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), hm(n, t);
	} else {
		if (mm(n, r)) return;
		fm.set(r), e.uniformMatrix2fv(this.addr, !1, fm), hm(n, r);
	}
}
function Sm(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (mm(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), hm(n, t);
	} else {
		if (mm(n, r)) return;
		dm.set(r), e.uniformMatrix3fv(this.addr, !1, dm), hm(n, r);
	}
}
function Cm(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (mm(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), hm(n, t);
	} else {
		if (mm(n, r)) return;
		um.set(r), e.uniformMatrix4fv(this.addr, !1, um), hm(n, r);
	}
}
function wm(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function Tm(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (mm(n, t)) return;
		e.uniform2iv(this.addr, t), hm(n, t);
	}
}
function Em(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (mm(n, t)) return;
		e.uniform3iv(this.addr, t), hm(n, t);
	}
}
function Dm(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (mm(n, t)) return;
		e.uniform4iv(this.addr, t), hm(n, t);
	}
}
function Om(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function km(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (mm(n, t)) return;
		e.uniform2uiv(this.addr, t), hm(n, t);
	}
}
function Am(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (mm(n, t)) return;
		e.uniform3uiv(this.addr, t), hm(n, t);
	}
}
function jm(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (mm(n, t)) return;
		e.uniform4uiv(this.addr, t), hm(n, t);
	}
}
function Mm(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	this.type === e.SAMPLER_2D_SHADOW ? (im.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, a = im) : a = rm, n.setTexture2D(t || a, i);
}
function Nm(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || om, i);
}
function Pm(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTextureCube(t || sm, i);
}
function Fm(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || am, i);
}
function Im(e) {
	switch (e) {
		case 5126: return _m;
		case 35664: return vm;
		case 35665: return ym;
		case 35666: return bm;
		case 35674: return xm;
		case 35675: return Sm;
		case 35676: return Cm;
		case 5124:
		case 35670: return wm;
		case 35667:
		case 35671: return Tm;
		case 35668:
		case 35672: return Em;
		case 35669:
		case 35673: return Dm;
		case 5125: return Om;
		case 36294: return km;
		case 36295: return Am;
		case 36296: return jm;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Mm;
		case 35679:
		case 36299:
		case 36307: return Nm;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return Pm;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return Fm;
	}
}
function Lm(e, t) {
	e.uniform1fv(this.addr, t);
}
function Rm(e, t) {
	let n = pm(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function zm(e, t) {
	let n = pm(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function Bm(e, t) {
	let n = pm(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function Vm(e, t) {
	let n = pm(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function Hm(e, t) {
	let n = pm(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function Um(e, t) {
	let n = pm(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function Wm(e, t) {
	e.uniform1iv(this.addr, t);
}
function Gm(e, t) {
	e.uniform2iv(this.addr, t);
}
function Km(e, t) {
	e.uniform3iv(this.addr, t);
}
function qm(e, t) {
	e.uniform4iv(this.addr, t);
}
function Jm(e, t) {
	e.uniform1uiv(this.addr, t);
}
function Ym(e, t) {
	e.uniform2uiv(this.addr, t);
}
function Xm(e, t) {
	e.uniform3uiv(this.addr, t);
}
function Zm(e, t) {
	e.uniform4uiv(this.addr, t);
}
function Qm(e, t, n) {
	let r = this.cache, i = t.length, a = gm(n, i);
	mm(r, a) || (e.uniform1iv(this.addr, a), hm(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? im : rm;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function $m(e, t, n) {
	let r = this.cache, i = t.length, a = gm(n, i);
	mm(r, a) || (e.uniform1iv(this.addr, a), hm(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || om, a[e]);
}
function eh(e, t, n) {
	let r = this.cache, i = t.length, a = gm(n, i);
	mm(r, a) || (e.uniform1iv(this.addr, a), hm(r, a));
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || sm, a[e]);
}
function th(e, t, n) {
	let r = this.cache, i = t.length, a = gm(n, i);
	mm(r, a) || (e.uniform1iv(this.addr, a), hm(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || am, a[e]);
}
function nh(e) {
	switch (e) {
		case 5126: return Lm;
		case 35664: return Rm;
		case 35665: return zm;
		case 35666: return Bm;
		case 35674: return Vm;
		case 35675: return Hm;
		case 35676: return Um;
		case 5124:
		case 35670: return Wm;
		case 35667:
		case 35671: return Gm;
		case 35668:
		case 35672: return Km;
		case 35669:
		case 35673: return qm;
		case 5125: return Jm;
		case 36294: return Ym;
		case 36295: return Xm;
		case 36296: return Zm;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Qm;
		case 35679:
		case 36299:
		case 36307: return $m;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return eh;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return th;
	}
}
var rh = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Im(t.type);
	}
}, ih = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = nh(t.type);
	}
}, ah = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, oh = /(\w+)(\])?(\[|\.)?/g;
function sh(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function ch(e, t, n) {
	let r = e.name, i = r.length;
	for (oh.lastIndex = 0;;) {
		let a = oh.exec(r), o = oh.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			sh(n, l === void 0 ? new rh(s, e, t) : new ih(s, e, t));
			break;
		} else {
			let e = n.map[s];
			e === void 0 && (e = new ah(s), sh(n, e)), n = e;
		}
	}
}
var lh = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			ch(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function uh(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var dh = 37297, fh = 0;
function ph(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var mh = /*@__PURE__*/ new Y();
function hh(e) {
	X._getMatrix(mh, X.workingColorSpace, e);
	let t = `mat3( ${mh.elements.map((e) => e.toFixed(4))} )`;
	switch (X.getTransfer(e)) {
		case Nc: return [t, "LinearTransferOETF"];
		case Pc: return [t, "sRGBTransferOETF"];
		default: return W("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function gh(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + ph(e.getShaderSource(t), r);
	} else return i;
}
function _h(e, t) {
	let n = hh(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
		"}"
	].join("\n");
}
var vh = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function yh(e, t) {
	let n = vh[t];
	return n === void 0 ? (W("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var bh = /*@__PURE__*/ new J();
function xh() {
	return X.getLuminanceCoefficients(bh), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${bh.x.toFixed(4)}, ${bh.y.toFixed(4)}, ${bh.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function Sh(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Th).join("\n");
}
function Ch(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function wh(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function Th(e) {
	return e !== "";
}
function Eh(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Dh(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Oh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function kh(e) {
	return e.replace(Oh, jh);
}
var Ah = /* @__PURE__ */ new Map();
function jh(e, t) {
	let n = Q[t];
	if (n === void 0) {
		let e = Ah.get(t);
		if (e !== void 0) n = Q[e], W("WebGLRenderer: Shader chunk \"%s\" has been deprecated. Use \"%s\" instead.", t, e);
		else throw Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
	}
	return kh(n);
}
var Mh = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Nh(e) {
	return e.replace(Mh, Ph);
}
function Ph(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function Fh(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var Ih = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function Lh(e) {
	return Ih[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var Rh = {
	301: "ENVMAP_TYPE_CUBE",
	302: "ENVMAP_TYPE_CUBE",
	306: "ENVMAP_TYPE_CUBE_UV"
};
function zh(e) {
	return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Rh[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var Bh = { 302: "ENVMAP_MODE_REFRACTION" };
function Vh(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : Bh[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var Hh = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function Uh(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Hh[e.combine] || "ENVMAP_BLENDING_NONE";
}
function Wh(e) {
	let t = e.envMapCubeUVHeight;
	if (t === null) return null;
	let n = Math.log2(t) - 2, r = 1 / t;
	return {
		texelWidth: 1 / (3 * Math.max(2 ** n, 112)),
		texelHeight: r,
		maxMip: n
	};
}
function Gh(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = Lh(n), l = zh(n), u = Vh(n), d = Uh(n), f = Wh(n), p = Sh(n), m = Ch(a), h = i.createProgram(), g, _, v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(Th).join("\n"), g.length > 0 && (g += "\n"), _ = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(Th).join("\n"), _.length > 0 && (_ += "\n")) : (g = [
		Fh(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(Th).join("\n"), _ = [
		Fh(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
		f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
		f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : Q.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : yh("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		Q.colorspace_pars_fragment,
		_h("linearToOutputTexel", n.outputColorSpace),
		xh(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(Th).join("\n")), o = kh(o), o = Eh(o, n), o = Dh(o, n), s = kh(s), s = Eh(s, n), s = Dh(s, n), o = Nh(o), s = Nh(s), n.isRawShaderMaterial !== !0 && (v = "#version 300 es\n", g = [
		p,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + g, _ = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + _);
	let y = v + g + o, b = v + _ + s, x = uh(i, i.VERTEX_SHADER, y), S = uh(i, i.FRAGMENT_SHADER, b);
	i.attachShader(h, x), i.attachShader(h, S), n.index0AttributeName === void 0 ? n.hasPositionAttribute === !0 && i.bindAttribLocation(h, 0, "position") : i.bindAttribLocation(h, 0, n.index0AttributeName), i.linkProgram(h);
	function C(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(h) || "", r = i.getShaderInfoLog(x) || "", a = i.getShaderInfoLog(S) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(h, i.LINK_STATUS) === !1) if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, h, x, S);
			else {
				let e = gh(i, x, "vertex"), n = gh(i, S, "fragment");
				G("WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(h, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
			}
			else o === "" ? (s === "" || c === "") && (u = !1) : W("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: g
				},
				fragmentShader: {
					log: c,
					prefix: _
				}
			});
		}
		i.deleteShader(x), i.deleteShader(S), w = new lh(i, h), T = wh(i, h);
	}
	let w;
	this.getUniforms = function() {
		return w === void 0 && C(this), w;
	};
	let T;
	this.getAttributes = function() {
		return T === void 0 && C(this), T;
	};
	let E = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return E === !1 && (E = i.getProgramParameter(h, dh)), E;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(h), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = fh++, this.cacheKey = t, this.usedTimes = 1, this.program = h, this.vertexShader = x, this.fragmentShader = S, this;
}
var Kh = 0, qh = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e, t, n) {
		let r = this._getShaderCacheForMaterial(e);
		return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderStage(e) {
		return this._getShaderStage(e.vertexShader);
	}
	getFragmentShaderStage(e) {
		return this._getShaderStage(e.fragmentShader);
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new Jh(e), t.set(e, n)), n;
	}
}, Jh = class {
	constructor(e) {
		this.id = Kh++, this.code = e, this.usedTimes = 0;
	}
};
function Yh(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function Xh(e, t, n, r, i, a) {
	let o = new tu(), s = new qh(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = r.precision, p = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function m(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function h(i, o, l, u, h, g) {
		let _ = u.fog, v = h.geometry, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, b = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, x = t.get(i.envMap || y, b), S = x && x.mapping === 306 ? x.image.height : null, C = p[i.type];
		i.precision !== null && (f = r.getMaxPrecision(i.precision), f !== i.precision && W("WebGLProgram.getParameters:", i.precision, "not supported, using", f, "instead."));
		let w = v.morphAttributes.position || v.morphAttributes.normal || v.morphAttributes.color, T = w === void 0 ? 0 : w.length, E = 0;
		v.morphAttributes.position !== void 0 && (E = 1), v.morphAttributes.normal !== void 0 && (E = 2), v.morphAttributes.color !== void 0 && (E = 3);
		let D, O, k, A;
		if (C) {
			let e = vp[C];
			D = e.vertexShader, O = e.fragmentShader;
		} else {
			D = i.vertexShader, O = i.fragmentShader;
			let e = s.getVertexShaderStage(i), t = s.getFragmentShaderStage(i);
			s.update(i, e, t), k = e.id, A = t.id;
		}
		let ee = e.getRenderTarget(), te = e.state.buffers.depth.getReversed(), j = h.isInstancedMesh === !0, ne = h.isBatchedMesh === !0, M = !!i.map, N = !!i.matcap, re = !!x, ie = !!i.aoMap, ae = !!i.lightMap, oe = !!i.bumpMap && i.wireframe === !1, P = !!i.normalMap, se = !!i.displacementMap, F = !!i.emissiveMap, ce = !!i.metalnessMap, le = !!i.roughnessMap, ue = i.anisotropy > 0, de = i.clearcoat > 0, fe = i.dispersion > 0, pe = i.iridescence > 0, me = i.sheen > 0, he = i.transmission > 0, ge = ue && !!i.anisotropyMap, _e = de && !!i.clearcoatMap, ve = de && !!i.clearcoatNormalMap, ye = de && !!i.clearcoatRoughnessMap, be = pe && !!i.iridescenceMap, xe = pe && !!i.iridescenceThicknessMap, I = me && !!i.sheenColorMap, Se = me && !!i.sheenRoughnessMap, Ce = !!i.specularMap, we = !!i.specularColorMap, L = !!i.specularIntensityMap, Te = he && !!i.transmissionMap, R = he && !!i.thicknessMap, z = !!i.gradientMap, B = !!i.alphaMap, Ee = i.alphaTest > 0, De = !!i.alphaHash, Oe = !!i.extensions, ke = 0;
		i.toneMapped && (ee === null || ee.isXRRenderTarget === !0) && (ke = e.toneMapping);
		let Ae = {
			shaderID: C,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: D,
			fragmentShader: O,
			defines: i.defines,
			customVertexShaderID: k,
			customFragmentShaderID: A,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: f,
			batching: ne,
			batchingColor: ne && h._colorsTexture !== null,
			instancing: j,
			instancingColor: j && h.instanceColor !== null,
			instancingMorph: j && h.morphTexture !== null,
			outputColorSpace: ee === null ? e.outputColorSpace : ee.isXRRenderTarget === !0 ? ee.texture.colorSpace : X.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: M,
			matcap: N,
			envMap: re,
			envMapMode: re && x.mapping,
			envMapCubeUVHeight: S,
			aoMap: ie,
			lightMap: ae,
			bumpMap: oe,
			normalMap: P,
			displacementMap: se,
			emissiveMap: F,
			normalMapObjectSpace: P && i.normalMapType === 1,
			normalMapTangentSpace: P && i.normalMapType === 0,
			packedNormalMap: P && i.normalMapType === 0 && Yh(i.normalMap.format),
			metalnessMap: ce,
			roughnessMap: le,
			anisotropy: ue,
			anisotropyMap: ge,
			clearcoat: de,
			clearcoatMap: _e,
			clearcoatNormalMap: ve,
			clearcoatRoughnessMap: ye,
			dispersion: fe,
			iridescence: pe,
			iridescenceMap: be,
			iridescenceThicknessMap: xe,
			sheen: me,
			sheenColorMap: I,
			sheenRoughnessMap: Se,
			specularMap: Ce,
			specularColorMap: we,
			specularIntensityMap: L,
			transmission: he,
			transmissionMap: Te,
			thicknessMap: R,
			gradientMap: z,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: B,
			alphaTest: Ee,
			alphaHash: De,
			combine: i.combine,
			mapUv: M && m(i.map.channel),
			aoMapUv: ie && m(i.aoMap.channel),
			lightMapUv: ae && m(i.lightMap.channel),
			bumpMapUv: oe && m(i.bumpMap.channel),
			normalMapUv: P && m(i.normalMap.channel),
			displacementMapUv: se && m(i.displacementMap.channel),
			emissiveMapUv: F && m(i.emissiveMap.channel),
			metalnessMapUv: ce && m(i.metalnessMap.channel),
			roughnessMapUv: le && m(i.roughnessMap.channel),
			anisotropyMapUv: ge && m(i.anisotropyMap.channel),
			clearcoatMapUv: _e && m(i.clearcoatMap.channel),
			clearcoatNormalMapUv: ve && m(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: ye && m(i.clearcoatRoughnessMap.channel),
			iridescenceMapUv: be && m(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: xe && m(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: I && m(i.sheenColorMap.channel),
			sheenRoughnessMapUv: Se && m(i.sheenRoughnessMap.channel),
			specularMapUv: Ce && m(i.specularMap.channel),
			specularColorMapUv: we && m(i.specularColorMap.channel),
			specularIntensityMapUv: L && m(i.specularIntensityMap.channel),
			transmissionMapUv: Te && m(i.transmissionMap.channel),
			thicknessMapUv: R && m(i.thicknessMap.channel),
			alphaMapUv: B && m(i.alphaMap.channel),
			vertexTangents: !!v.attributes.tangent && (P || ue),
			vertexNormals: !!v.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!v.attributes.color && v.attributes.color.itemSize === 4,
			pointsUvs: h.isPoints === !0 && !!v.attributes.uv && (M || B),
			fog: !!_,
			useFog: i.fog === !0,
			fogExp2: !!_ && _.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || v.attributes.normal === void 0 && P === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: te,
			skinning: h.isSkinnedMesh === !0,
			hasPositionAttribute: v.attributes.position !== void 0,
			morphTargets: v.morphAttributes.position !== void 0,
			morphNormals: v.morphAttributes.normal !== void 0,
			morphColors: v.morphAttributes.color !== void 0,
			morphTargetsCount: T,
			morphTextureStride: E,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: g.length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: ke,
			decodeVideoTexture: M && i.map.isVideoTexture === !0 && X.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: F && i.emissiveMap.isVideoTexture === !0 && X.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: Oe && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (Oe && i.extensions.multiDraw === !0 || ne) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return Ae.vertexUv1s = c.has(1), Ae.vertexUv2s = c.has(2), Ae.vertexUv3s = c.has(3), c.clear(), Ae;
	}
	function g(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (_(n, t), v(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function _(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function v(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
	}
	function y(e) {
		let t = p[e.type], n;
		if (t) {
			let e = vp[t];
			n = pf.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function b(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new Gh(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function x(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function S(e) {
		s.remove(e);
	}
	function C() {
		s.dispose();
	}
	return {
		getParameters: h,
		getProgramCacheKey: g,
		getUniforms: y,
		acquireProgram: b,
		releaseProgram: x,
		releaseShaderCache: S,
		programs: l,
		dispose: C
	};
}
function Zh() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function Qh(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function $h(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function eg() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(u) : a.transparent === !0 ? i.push(u) : n.push(u);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t, a) {
		n.length > 1 && n.sort(e || Qh), r.length > 1 && r.sort(t || $h), i.length > 1 && i.sort(t || $h), a && (n.reverse(), r.reverse(), i.reverse());
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function tg() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new eg(), e.set(t, [i])) : n >= r.length ? (i = new eg(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function ng() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "DirectionalLight":
				n = {
					direction: new J(),
					color: new Z()
				};
				break;
			case "SpotLight":
				n = {
					position: new J(),
					direction: new J(),
					color: new Z(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new J(),
					color: new Z(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new J(),
					skyColor: new Z(),
					groundColor: new Z()
				};
				break;
			case "RectAreaLight":
				n = {
					color: new Z(),
					position: new J(),
					halfWidth: new J(),
					halfHeight: new J()
				};
				break;
		}
		return e[t.id] = n, n;
	} };
}
function rg() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new q()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new q()
				};
				break;
			case "PointLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new q(),
					shadowCameraNear: 1,
					shadowCameraFar: 1e3
				};
				break;
		}
		return e[t.id] = n, n;
	} };
}
var ig = 0;
function ag(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function og(e) {
	let t = new ng(), n = rg(), r = {
		version: 0,
		hash: {
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new J());
	let i = new J(), a = new Wl(), o = new Wl();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0;
		i.sort(ag);
		for (let e = 0, y = i.length; e < y; e++) {
			let y = i[e], b = y.color, x = y.intensity, S = y.distance, C = null;
			if (y.shadow && y.shadow.map && (C = y.shadow.map.texture.format === 1030 ? y.shadow.map.texture : y.shadow.map.depthTexture || y.shadow.map.texture), y.isAmbientLight) a += b.r * x, o += b.g * x, s += b.b * x;
			else if (y.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(y.sh.coefficients[e], x);
				v++;
			} else if (y.isDirectionalLight) {
				let e = t.get(y);
				if (e.color.copy(y.color).multiplyScalar(y.intensity), y.castShadow) {
					let e = y.shadow, t = n.get(y);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[c] = t, r.directionalShadowMap[c] = C, r.directionalShadowMatrix[c] = y.shadow.matrix, p++;
				}
				r.directional[c] = e, c++;
			} else if (y.isSpotLight) {
				let e = t.get(y);
				e.position.setFromMatrixPosition(y.matrixWorld), e.color.copy(b).multiplyScalar(x), e.distance = S, e.coneCos = Math.cos(y.angle), e.penumbraCos = Math.cos(y.angle * (1 - y.penumbra)), e.decay = y.decay, r.spot[u] = e;
				let i = y.shadow;
				if (y.map && (r.spotLightMap[g] = y.map, g++, i.updateMatrices(y), y.castShadow && _++), r.spotLightMatrix[u] = i.matrix, y.castShadow) {
					let e = n.get(y);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[u] = e, r.spotShadowMap[u] = C, h++;
				}
				u++;
			} else if (y.isRectAreaLight) {
				let e = t.get(y);
				e.color.copy(b).multiplyScalar(x), e.halfWidth.set(y.width * .5, 0, 0), e.halfHeight.set(0, y.height * .5, 0), r.rectArea[d] = e, d++;
			} else if (y.isPointLight) {
				let e = t.get(y);
				if (e.color.copy(y.color).multiplyScalar(y.intensity), e.distance = y.distance, e.decay = y.decay, y.castShadow) {
					let e = y.shadow, t = n.get(y);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[l] = t, r.pointShadowMap[l] = C, r.pointShadowMatrix[l] = y.shadow.matrix, m++;
				}
				r.point[l] = e, l++;
			} else if (y.isHemisphereLight) {
				let e = t.get(y);
				e.skyColor.copy(y.color).multiplyScalar(x), e.groundColor.copy(y.groundColor).multiplyScalar(x), r.hemi[f] = e, f++;
			}
		}
		d > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = $.LTC_FLOAT_1, r.rectAreaLTC2 = $.LTC_FLOAT_2) : (r.rectAreaLTC1 = $.LTC_HALF_1, r.rectAreaLTC2 = $.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let y = r.hash;
		(y.directionalLength !== c || y.pointLength !== l || y.spotLength !== u || y.rectAreaLength !== d || y.hemiLength !== f || y.numDirectionalShadows !== p || y.numPointShadows !== m || y.numSpotShadows !== h || y.numSpotMaps !== g || y.numLightProbes !== v) && (r.directional.length = c, r.spot.length = u, r.rectArea.length = d, r.point.length = l, r.hemi.length = f, r.directionalShadow.length = p, r.directionalShadowMap.length = p, r.pointShadow.length = m, r.pointShadowMap.length = m, r.spotShadow.length = h, r.spotShadowMap.length = h, r.directionalShadowMatrix.length = p, r.pointShadowMatrix.length = m, r.spotLightMatrix.length = h + g - _, r.spotLightMap.length = g, r.numSpotLightShadowsWithMaps = _, r.numLightProbes = v, y.directionalLength = c, y.pointLength = l, y.spotLength = u, y.rectAreaLength = d, y.hemiLength = f, y.numDirectionalShadows = p, y.numPointShadows = m, y.numSpotShadows = h, y.numSpotMaps = g, y.numLightProbes = v, r.version = ig++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = t.matrixWorldInverse;
		for (let t = 0, f = e.length; t < f; t++) {
			let f = e[t];
			if (f.isDirectionalLight) {
				let e = r.directional[n];
				e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), n++;
			} else if (f.isSpotLight) {
				let e = r.spot[c];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), c++;
			} else if (f.isRectAreaLight) {
				let e = r.rectArea[l];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), o.identity(), a.copy(f.matrixWorld), a.premultiply(d), o.extractRotation(a), e.halfWidth.set(f.width * .5, 0, 0), e.halfHeight.set(0, f.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), l++;
			} else if (f.isPointLight) {
				let e = r.point[s];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), s++;
			} else if (f.isHemisphereLight) {
				let e = r.hemi[u];
				e.direction.setFromMatrixPosition(f.matrixWorld), e.direction.transformDirection(d), u++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function sg(e) {
	let t = new og(e), n = [], r = [], i = [];
	function a(e) {
		d.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c(e) {
		i.push(e);
	}
	function l() {
		t.setup(n);
	}
	function u(e) {
		t.setupView(n, e);
	}
	let d = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: d,
		setupLights: l,
		setupLightsView: u,
		pushLight: o,
		pushShadow: s,
		pushLightProbeGrid: c
	};
}
function cg(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new sg(e), t.set(n, [a])) : r >= i.length ? (a = new sg(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var lg = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", ug = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", dg = [
	/*@__PURE__*/ new J(1, 0, 0),
	/*@__PURE__*/ new J(-1, 0, 0),
	/*@__PURE__*/ new J(0, 1, 0),
	/*@__PURE__*/ new J(0, -1, 0),
	/*@__PURE__*/ new J(0, 0, 1),
	/*@__PURE__*/ new J(0, 0, -1)
], fg = [
	/*@__PURE__*/ new J(0, -1, 0),
	/*@__PURE__*/ new J(0, -1, 0),
	/*@__PURE__*/ new J(0, 0, 1),
	/*@__PURE__*/ new J(0, 0, -1),
	/*@__PURE__*/ new J(0, -1, 0),
	/*@__PURE__*/ new J(0, -1, 0)
], pg = /*@__PURE__*/ new Wl(), mg = /*@__PURE__*/ new J(), hg = /*@__PURE__*/ new J();
function gg(e, t, n) {
	let r = new ef(), i = new q(), a = new q(), o = new zl(), s = new vf(), c = new yf(), l = {}, u = n.maxTextureSize, d = {
		0: 1,
		1: 0,
		2: 2
	}, f = new gf({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new q() },
			radius: { value: 4 }
		},
		vertexShader: lg,
		fragmentShader: ug
	}), p = f.clone();
	p.defines.HORIZONTAL_PASS = 1;
	let m = new bd();
	m.setAttribute("position", new ad(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let h = new Ud(m, f), g = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let _ = this.type;
	this.render = function(t, n, s) {
		if (g.enabled === !1 || g.autoUpdate === !1 && g.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (W("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
		let c = e.getRenderTarget(), l = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), f = e.state;
		f.setBlending(0), f.buffers.depth.getReversed() === !0 ? f.buffers.color.setClear(0, 0, 0, 0) : f.buffers.color.setClear(1, 1, 1, 1), f.buffers.depth.setTest(!0), f.setScissorTest(!1);
		let p = _ !== this.type;
		p && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let c = 0, l = t.length; c < l; c++) {
			let l = t[c], d = l.shadow;
			if (d === void 0) {
				W("WebGLShadowMap:", l, "has no shadow.");
				continue;
			}
			if (d.autoUpdate === !1 && d.needsUpdate === !1) continue;
			i.copy(d.mapSize);
			let m = d.getFrameExtents();
			i.multiply(m), a.copy(d.mapSize), (i.x > u || i.y > u) && (i.x > u && (a.x = Math.floor(u / m.x), i.x = a.x * m.x, d.mapSize.x = a.x), i.y > u && (a.y = Math.floor(u / m.y), i.y = a.y * m.y, d.mapSize.y = a.y));
			let h = e.state.buffers.depth.getReversed();
			if (d.camera._reversedDepth = h, d.map === null || p === !0) {
				if (d.map !== null && (d.map.depthTexture !== null && (d.map.depthTexture.dispose(), d.map.depthTexture = null), d.map.dispose()), this.type === 3) {
					if (l.isPointLight) {
						W("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					d.map = new Vl(i.x, i.y, {
						format: Rs,
						type: Ts,
						minFilter: hs,
						magFilter: hs,
						generateMipmaps: !1
					}), d.map.texture.name = l.name + ".shadowMap", d.map.depthTexture = new nf(i.x, i.y, ws), d.map.depthTexture.name = l.name + ".shadowMapDepth", d.map.depthTexture.format = Ps, d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = fs, d.map.depthTexture.magFilter = fs;
				} else l.isPointLight ? (d.map = new qp(i.x), d.map.depthTexture = new rf(i.x, Cs)) : (d.map = new Vl(i.x, i.y), d.map.depthTexture = new nf(i.x, i.y, Cs)), d.map.depthTexture.name = l.name + ".shadowMap", d.map.depthTexture.format = Ps, this.type === 1 ? (d.map.depthTexture.compareFunction = h ? 518 : 515, d.map.depthTexture.minFilter = hs, d.map.depthTexture.magFilter = hs) : (d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = fs, d.map.depthTexture.magFilter = fs);
				d.camera.updateProjectionMatrix();
			}
			let g = d.map.isWebGLCubeRenderTarget ? 6 : 1;
			for (let t = 0; t < g; t++) {
				if (d.map.isWebGLCubeRenderTarget) e.setRenderTarget(d.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(d.map), e.clear());
					let n = d.getViewport(t);
					o.set(a.x * n.x, a.y * n.y, a.x * n.z, a.y * n.w), f.viewport(o);
				}
				if (l.isPointLight) {
					let e = d.camera, n = d.matrix, r = l.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), mg.setFromMatrixPosition(l.matrixWorld), e.position.copy(mg), hg.copy(e.position), hg.add(dg[t]), e.up.copy(fg[t]), e.lookAt(hg), e.updateMatrixWorld(), n.makeTranslation(-mg.x, -mg.y, -mg.z), pg.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), d._frustum.setFromProjectionMatrix(pg, e.coordinateSystem, e.reversedDepth);
				} else d.updateMatrices(l);
				r = d.getFrustum(), b(n, s, d.camera, l, this.type);
			}
			d.isPointLightShadow !== !0 && this.type === 3 && v(d, s), d.needsUpdate = !1;
		}
		_ = this.type, g.needsUpdate = !1, e.setRenderTarget(c, l, d);
	};
	function v(n, r) {
		let a = t.update(h);
		f.defines.VSM_SAMPLES !== n.blurSamples && (f.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), n.mapPass === null && (n.mapPass = new Vl(i.x, i.y, {
			format: Rs,
			type: Ts
		})), f.uniforms.shadow_pass.value = n.map.depthTexture, f.uniforms.resolution.value = n.mapSize, f.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, a, f, h, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, a, p, h, null);
	}
	function y(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? c : s, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = l[e];
			r === void 0 && (r = {}, l[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", x)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? d[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function b(n, i, a, o, s) {
		if (n.visible === !1) return;
		if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && s === 3) && (!n.frustumCulled || r.intersectsObject(n))) {
			n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
			let r = t.update(n), c = n.material;
			if (Array.isArray(c)) {
				let t = r.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = c[u.materialIndex];
					if (d && d.visible) {
						let t = y(n, d, o, s);
						n.onBeforeShadow(e, n, i, a, r, t, u), e.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(e, n, i, a, r, t, u);
					}
				}
			} else if (c.visible) {
				let t = y(n, c, o, s);
				n.onBeforeShadow(e, n, i, a, r, t, null), e.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(e, n, i, a, r, t, null);
			}
		}
		let c = n.children;
		for (let e = 0, t = c.length; e < t; e++) b(c[e], i, a, o, s);
	}
	function x(e) {
		e.target.removeEventListener("dispose", x);
		for (let t in l) {
			let n = l[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function _g(e, t) {
	function n() {
		let t = !1, n = new zl(), r = null, i = new zl(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? ce(e.DEPTH_TEST) : le(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = Jc[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? ce(e.STENCIL_TEST) : le(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new Z(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, te = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), j = !1, ne = 0, M = e.getParameter(e.VERSION);
	M.indexOf("WebGL") === -1 ? M.indexOf("OpenGL ES") !== -1 && (ne = parseFloat(/^OpenGL ES (\d)/.exec(M)[1]), j = ne >= 2) : (ne = parseFloat(/^WebGL (\d)/.exec(M)[1]), j = ne >= 1);
	let N = null, re = {}, ie = e.getParameter(e.SCISSOR_BOX), ae = e.getParameter(e.VIEWPORT), oe = new zl().fromArray(ie), P = new zl().fromArray(ae);
	function se(t, n, r, i) {
		let a = /* @__PURE__ */ new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let F = {};
	F[e.TEXTURE_2D] = se(e.TEXTURE_2D, e.TEXTURE_2D, 1), F[e.TEXTURE_CUBE_MAP] = se(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), F[e.TEXTURE_2D_ARRAY] = se(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), F[e.TEXTURE_3D] = se(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), ce(e.DEPTH_TEST), o.setFunc(3), _e(!1), ve(1), ce(e.CULL_FACE), he(0);
	function ce(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function le(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function ue(t, n) {
		return f[t] === n ? !1 : (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function de(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function fe(t) {
		return h === t ? !1 : (e.useProgram(t), h = t, !0);
	}
	let pe = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	pe[103] = e.MIN, pe[104] = e.MAX;
	let me = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function he(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) {
			g === !0 && (le(e.BLEND), g = !1);
			return;
		}
		if (g === !1 && (ce(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default:
						G("WebGLState: Invalid blending: ", t);
						break;
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						G("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						G("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default:
						G("WebGLState: Invalid blending: ", t);
						break;
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
			return;
		}
		a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(pe[n], pe[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(me[r], me[i], me[o], me[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function ge(t, n) {
		t.side === 2 ? le(e.CULL_FACE) : ce(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), _e(r), t.blending === 1 && t.transparent === !1 ? he(0) : he(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), be(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? ce(e.SAMPLE_ALPHA_TO_COVERAGE) : le(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function _e(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function ve(t) {
		t === 0 ? le(e.CULL_FACE) : (ce(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function ye(t) {
		t !== k && (j && e.lineWidth(t), k = t);
	}
	function be(t, n, r) {
		t ? (ce(e.POLYGON_OFFSET_FILL), (A !== n || ee !== r) && (A = n, ee = r, o.getReversed() && (n = -n), e.polygonOffset(n, r))) : le(e.POLYGON_OFFSET_FILL);
	}
	function xe(t) {
		t ? ce(e.SCISSOR_TEST) : le(e.SCISSOR_TEST);
	}
	function I(t) {
		t === void 0 && (t = e.TEXTURE0 + te - 1), N !== t && (e.activeTexture(t), N = t);
	}
	function Se(t, n, r) {
		r === void 0 && (r = N === null ? e.TEXTURE0 + te - 1 : N);
		let i = re[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, re[r] = i), (i.type !== t || i.texture !== n) && (N !== r && (e.activeTexture(r), N = r), e.bindTexture(t, n || F[t]), i.type = t, i.texture = n);
	}
	function Ce() {
		let t = re[N];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function we() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function L() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function Te() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function R() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function z() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function B() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function Ee() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function De() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function Oe() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function ke() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			G("WebGLState:", e);
		}
	}
	function Ae(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function je(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function Me(t) {
		oe.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), oe.copy(t));
	}
	function Ne(t) {
		P.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), P.copy(t));
	}
	function Pe(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i));
	}
	function Fe(t, n) {
		let r = l.get(n).get(t);
		c.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), c.set(n, r));
	}
	function Ie() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, N = null, re = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new Z(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, oe.set(0, 0, e.canvas.width, e.canvas.height), P.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: ce,
		disable: le,
		bindFramebuffer: ue,
		drawBuffers: de,
		useProgram: fe,
		setBlending: he,
		setMaterial: ge,
		setFlipSided: _e,
		setCullFace: ve,
		setLineWidth: ye,
		setPolygonOffset: be,
		setScissorTest: xe,
		activeTexture: I,
		bindTexture: Se,
		unbindTexture: Ce,
		compressedTexImage2D: we,
		compressedTexImage3D: L,
		texImage2D: Oe,
		texImage3D: ke,
		pixelStorei: je,
		getParameter: Ae,
		updateUBOMapping: Pe,
		uniformBlockBinding: Fe,
		texStorage2D: Ee,
		texStorage3D: De,
		texSubImage2D: Te,
		texSubImage3D: R,
		compressedTexSubImage2D: z,
		compressedTexSubImage3D: B,
		scissor: Me,
		viewport: Ne,
		reset: Ie
	};
}
function vg(e, t, n, r, i, a, o) {
	let s = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new q(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p = /* @__PURE__ */ new WeakMap(), m = !1;
	try {
		m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function h(e, t) {
		return m ? new OffscreenCanvas(e, t) : Bc("canvas");
	}
	function g(e, t, n) {
		let r = 1, i = we(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
			let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
			f === void 0 && (f = h(n, a));
			let o = t ? h(n, a) : f;
			return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), W("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
		} else return "data" in e && W("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		return e;
	}
	function _(e) {
		return e.generateMipmaps;
	}
	function v(t) {
		e.generateMipmap(t);
	}
	function y(t) {
		return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
	}
	function b(n, r, i, a, o, s = !1) {
		if (n !== null) {
			if (e[n] !== void 0) return e[n];
			W("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
		}
		let c;
		a && (c = t.get("EXT_texture_norm16"), c || W("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = r;
		if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && c && (l = c.R16_EXT), i === e.SHORT && c && (l = c.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && c && (l = c.RG16_EXT), i === e.SHORT && c && (l = c.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), i === e.SHORT && c && (l = c.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) {
			let t = s ? Nc : X.getTransfer(o);
			i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), i === e.SHORT && c && (l = c.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1);
		}
		return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get("EXT_color_buffer_float"), l;
	}
	function x(t, n) {
		let r;
		return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, W("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r;
	}
	function S(e, t) {
		return _(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps !== void 0 && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function C(e) {
		let t = e.target;
		t.removeEventListener("dispose", C), T(t), t.isVideoTexture && u.delete(t), t.isHTMLTexture && d.delete(t);
	}
	function w(e) {
		let t = e.target;
		t.removeEventListener("dispose", w), D(t);
	}
	function T(e) {
		let t = r.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, i = p.get(n);
		if (i) {
			let r = i[t.__cacheKey];
			r.usedTimes--, r.usedTimes === 0 && E(e), Object.keys(i).length === 0 && p.delete(n);
		}
		r.remove(e);
	}
	function E(t) {
		let n = r.get(t);
		e.deleteTexture(n.__webglTexture);
		let i = t.source, a = p.get(i);
		delete a[n.__cacheKey], o.memory.textures--;
	}
	function D(t) {
		let n = r.get(t);
		if (t.depthTexture && (t.depthTexture.dispose(), r.remove(t.depthTexture)), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
			if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);
			else e.deleteFramebuffer(n.__webglFramebuffer[t]);
			n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
		}
		else {
			if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);
			else e.deleteFramebuffer(n.__webglFramebuffer);
			if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
			n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
		}
		let i = t.textures;
		for (let t = 0, n = i.length; t < n; t++) {
			let n = r.get(i[t]);
			n.__webglTexture && (e.deleteTexture(n.__webglTexture), o.memory.textures--), r.remove(i[t]);
		}
		r.remove(t);
	}
	let O = 0;
	function k() {
		O = 0;
	}
	function A() {
		return O;
	}
	function ee(e) {
		O = e;
	}
	function te() {
		let e = O;
		return e >= i.maxTextures && W("WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + i.maxTextures), O += 1, e;
	}
	function j(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function ne(t, i) {
		let a = r.get(t);
		if (t.isVideoTexture && Se(t), t.isRenderTargetTexture === !1 && t.isExternalTexture !== !0 && t.version > 0 && a.__version !== t.version) {
			let e = t.image;
			if (e === null) W("WebGLRenderer: Texture marked for update but no image data found.");
			else if (e.complete === !1) W("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				le(a, t, i);
				return;
			}
		} else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		n.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function M(t, i) {
		let a = r.get(t);
		if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) {
			le(a, t, i);
			return;
		} else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		n.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + i);
	}
	function N(t, i) {
		let a = r.get(t);
		if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) {
			le(a, t, i);
			return;
		}
		n.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function re(t, i) {
		let a = r.get(t);
		if (t.isCubeDepthTexture !== !0 && t.version > 0 && a.__version !== t.version) {
			ue(a, t, i);
			return;
		}
		n.bindTexture(e.TEXTURE_CUBE_MAP, a.__webglTexture, e.TEXTURE0 + i);
	}
	let ie = {
		[ls]: e.REPEAT,
		[us]: e.CLAMP_TO_EDGE,
		[ds]: e.MIRRORED_REPEAT
	}, ae = {
		[fs]: e.NEAREST,
		[ps]: e.NEAREST_MIPMAP_NEAREST,
		[ms]: e.NEAREST_MIPMAP_LINEAR,
		[hs]: e.LINEAR,
		[gs]: e.LINEAR_MIPMAP_NEAREST,
		[_s]: e.LINEAR_MIPMAP_LINEAR
	}, oe = {
		512: e.NEVER,
		519: e.ALWAYS,
		513: e.LESS,
		515: e.LEQUAL,
		514: e.EQUAL,
		518: e.GEQUAL,
		516: e.GREATER,
		517: e.NOTEQUAL
	};
	function P(n, a) {
		if (a.type === 1015 && t.has("OES_texture_float_linear") === !1 && (a.magFilter === 1006 || a.magFilter === 1007 || a.magFilter === 1005 || a.magFilter === 1008 || a.minFilter === 1006 || a.minFilter === 1007 || a.minFilter === 1005 || a.minFilter === 1008) && W("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n, e.TEXTURE_WRAP_S, ie[a.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, ie[a.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, ie[a.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, ae[a.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, ae[a.minFilter]), a.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, oe[a.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
			if (a.magFilter === 1003 || a.minFilter !== 1005 && a.minFilter !== 1008 || a.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
			if (a.anisotropy > 1 || r.get(a).__currentAnisotropy) {
				let o = t.get("EXT_texture_filter_anisotropic");
				e.texParameterf(n, o.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, i.getMaxAnisotropy())), r.get(a).__currentAnisotropy = a.anisotropy;
			}
		}
	}
	function se(t, n) {
		let r = !1;
		t.__webglInit === void 0 && (t.__webglInit = !0, n.addEventListener("dispose", C));
		let i = n.source, a = p.get(i);
		a === void 0 && (a = {}, p.set(i, a));
		let s = j(n);
		if (s !== t.__cacheKey) {
			a[s] === void 0 && (a[s] = {
				texture: e.createTexture(),
				usedTimes: 0
			}, o.memory.textures++, r = !0), a[s].usedTimes++;
			let i = a[t.__cacheKey];
			i !== void 0 && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && E(n)), t.__cacheKey = s, t.__webglTexture = a[s].texture;
		}
		return r;
	}
	function F(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function ce(t, r, i, a) {
		let o = t.updateRanges;
		if (o.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r.width, r.height, i, a, r.data);
		else {
			o.sort((e, t) => e.start - t.start);
			let s = 0;
			for (let e = 1; e < o.length; e++) {
				let t = o[s], n = o[e], i = t.start + t.count, a = F(n.start, r.width, 4), c = F(t.start, r.width, 4);
				n.start <= i + 1 && a === c && F(n.start + n.count - 1, r.width, 4) === a ? t.count = Math.max(t.count, n.start + n.count - t.start) : (++s, o[s] = n);
			}
			o.length = s + 1;
			let c = n.getParameter(e.UNPACK_ROW_LENGTH), l = n.getParameter(e.UNPACK_SKIP_PIXELS), u = n.getParameter(e.UNPACK_SKIP_ROWS);
			n.pixelStorei(e.UNPACK_ROW_LENGTH, r.width);
			for (let t = 0, s = o.length; t < s; t++) {
				let s = o[t], c = Math.floor(s.start / 4), l = Math.ceil(s.count / 4), u = c % r.width, d = Math.floor(c / r.width), f = l;
				n.pixelStorei(e.UNPACK_SKIP_PIXELS, u), n.pixelStorei(e.UNPACK_SKIP_ROWS, d), n.texSubImage2D(e.TEXTURE_2D, 0, u, d, f, 1, i, a, r.data);
			}
			t.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, c), n.pixelStorei(e.UNPACK_SKIP_PIXELS, l), n.pixelStorei(e.UNPACK_SKIP_ROWS, u);
		}
	}
	function le(t, o, s) {
		let c = e.TEXTURE_2D;
		(o.isDataArrayTexture || o.isCompressedArrayTexture) && (c = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (c = e.TEXTURE_3D);
		let l = se(t, o), u = o.source;
		n.bindTexture(c, t.__webglTexture, e.TEXTURE0 + s);
		let f = r.get(u);
		if (u.version !== f.__version || l === !0) {
			if (n.activeTexture(e.TEXTURE0 + s), !(typeof ImageBitmap < "u" && o.image instanceof ImageBitmap)) {
				let t = X.getPrimaries(X.workingColorSpace), r = o.colorSpace === "" ? null : X.getPrimaries(o.colorSpace), i = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
				n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i);
			}
			n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment);
			let t = g(o.image, !1, i.maxTextureSize);
			t = Ce(o, t);
			let r = a.convert(o.format, o.colorSpace), p = a.convert(o.type), m = b(o.internalFormat, r, p, o.normalized, o.colorSpace, o.isVideoTexture);
			P(c, o);
			let h, y = o.mipmaps, C = o.isVideoTexture !== !0, w = f.__version === void 0 || l === !0, T = u.dataReady, E = S(o, t);
			if (o.isDepthTexture) m = x(o.format === Fs, o.type), w && (C ? n.texStorage2D(e.TEXTURE_2D, 1, m, t.width, t.height) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, null));
			else if (o.isDataTexture) if (y.length > 0) {
				C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height);
				for (let t = 0, i = y.length; t < i; t++) h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data);
				o.generateMipmaps = !1;
			} else C ? (w && n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height), T && ce(o, t, r, p)) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, t.data);
			else if (o.isCompressedTexture) if (o.isCompressedArrayTexture) {
				C && w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, y[0].width, y[0].height, t.depth);
				for (let i = 0, a = y.length; i < a; i++) if (h = y[i], o.format !== 1023) if (r !== null) if (C) {
					if (T) if (o.layerUpdates.size > 0) {
						let t = mp(h.width, h.height, o.format, o.type);
						for (let a of o.layerUpdates) {
							let o = h.data.subarray(a * t / h.data.BYTES_PER_ELEMENT, (a + 1) * t / h.data.BYTES_PER_ELEMENT);
							n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, a, h.width, h.height, 1, r, o);
						}
						o.clearLayerUpdates();
					} else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, h.data);
				} else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, h.data, 0, 0);
				else W("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
				else C ? T && n.texSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, p, h.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, r, p, h.data);
			} else {
				C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height);
				for (let t = 0, i = y.length; t < i; t++) h = y[t], o.format === 1023 ? C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data) : r === null ? W("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : C ? T && n.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, h.data) : n.compressedTexImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, h.data);
			}
			else if (o.isDataArrayTexture) if (C) {
				if (w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, t.width, t.height, t.depth), T) if (o.layerUpdates.size > 0) {
					let i = mp(t.width, t.height, o.format, o.type);
					for (let a of o.layerUpdates) {
						let o = t.data.subarray(a * i / t.data.BYTES_PER_ELEMENT, (a + 1) * i / t.data.BYTES_PER_ELEMENT);
						n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, a, t.width, t.height, 1, r, p, o);
					}
					o.clearLayerUpdates();
				} else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data);
			} else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, m, t.width, t.height, t.depth, 0, r, p, t.data);
			else if (o.isData3DTexture) C ? (w && n.texStorage3D(e.TEXTURE_3D, E, m, t.width, t.height, t.depth), T && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data)) : n.texImage3D(e.TEXTURE_3D, 0, m, t.width, t.height, t.depth, 0, r, p, t.data);
			else if (o.isFramebufferTexture) {
				if (w) if (C) n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height);
				else {
					let i = t.width, a = t.height;
					for (let t = 0; t < E; t++) n.texImage2D(e.TEXTURE_2D, t, m, i, a, 0, r, p, null), i >>= 1, a >>= 1;
				}
			} else if (o.isHTMLTexture) {
				if ("texElementImage2D" in e) {
					let n = e.canvas;
					if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), t.parentNode !== n) {
						n.appendChild(t), d.add(o), n.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of d) t.includes(e.image) && (e.needsUpdate = !0);
						}, n.requestPaint();
						return;
					}
					if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t);
					else {
						let n = e.RGBA, r = e.RGBA, i = e.UNSIGNED_BYTE;
						e.texElementImage2D(e.TEXTURE_2D, 0, n, r, i, t);
					}
					e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
				}
			} else if (y.length > 0) {
				if (C && w) {
					let t = we(y[0]);
					n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height);
				}
				for (let t = 0, i = y.length; t < i; t++) h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, r, p, h) : n.texImage2D(e.TEXTURE_2D, t, m, r, p, h);
				o.generateMipmaps = !1;
			} else if (C) {
				if (w) {
					let r = we(t);
					n.texStorage2D(e.TEXTURE_2D, E, m, r.width, r.height);
				}
				T && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r, p, t);
			} else n.texImage2D(e.TEXTURE_2D, 0, m, r, p, t);
			_(o) && v(c), f.__version = u.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function ue(t, o, s) {
		if (o.image.length !== 6) return;
		let c = se(t, o), l = o.source;
		n.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + s);
		let u = r.get(l);
		if (l.version !== u.__version || c === !0) {
			n.activeTexture(e.TEXTURE0 + s);
			let t = X.getPrimaries(X.workingColorSpace), r = o.colorSpace === "" ? null : X.getPrimaries(o.colorSpace), d = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
			n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, d);
			let f = o.isCompressedTexture || o.image[0].isCompressedTexture, p = o.image[0] && o.image[0].isDataTexture, m = [];
			for (let e = 0; e < 6; e++) !f && !p ? m[e] = g(o.image[e], !0, i.maxCubemapSize) : m[e] = p ? o.image[e].image : o.image[e], m[e] = Ce(o, m[e]);
			let h = m[0], y = a.convert(o.format, o.colorSpace), x = a.convert(o.type), C = b(o.internalFormat, y, x, o.normalized, o.colorSpace), w = o.isVideoTexture !== !0, T = u.__version === void 0 || c === !0, E = l.dataReady, D = S(o, h);
			P(e.TEXTURE_CUBE_MAP, o);
			let O;
			if (f) {
				w && T && n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, h.width, h.height);
				for (let t = 0; t < 6; t++) {
					O = m[t].mipmaps;
					for (let r = 0; r < O.length; r++) {
						let i = O[r];
						o.format === 1023 ? w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, y, x, i.data) : y === null ? W("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : w ? E && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, i.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, i.data);
					}
				}
			} else {
				if (O = o.mipmaps, w && T) {
					O.length > 0 && D++;
					let t = we(m[0]);
					n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, t.width, t.height);
				}
				for (let t = 0; t < 6; t++) if (p) {
					w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, m[t].width, m[t].height, y, x, m[t].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, m[t].width, m[t].height, 0, y, x, m[t].data);
					for (let r = 0; r < O.length; r++) {
						let i = O[r].image[t].image;
						w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, i.width, i.height, 0, y, x, i.data);
					}
				} else {
					w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, y, x, m[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, y, x, m[t]);
					for (let r = 0; r < O.length; r++) {
						let i = O[r];
						w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, y, x, i.image[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, y, x, i.image[t]);
					}
				}
			}
			_(o) && v(e.TEXTURE_CUBE_MAP), u.__version = l.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function de(t, i, o, c, l, u) {
		let d = a.convert(o.format, o.colorSpace), f = a.convert(o.type), p = b(o.internalFormat, d, f, o.normalized, o.colorSpace), m = r.get(i), h = r.get(o);
		if (h.__renderTarget = i, !m.__hasExternalTextures) {
			let t = Math.max(1, i.width >> u), r = Math.max(1, i.height >> u);
			l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY ? n.texImage3D(l, u, p, t, r, i.depth, 0, d, f, null) : n.texImage2D(l, u, p, t, r, 0, d, f, null);
		}
		n.bindFramebuffer(e.FRAMEBUFFER, t), I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, c, l, h.__webglTexture, 0, xe(i)) : (l === e.TEXTURE_2D || l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, c, l, h.__webglTexture, u), n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function fe(t, n, r) {
		if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) {
			let i = n.depthTexture, a = i && i.isDepthTexture ? i.type : null, o = x(n.stencilBuffer, a), c = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
			I(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, xe(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, xe(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, c, e.RENDERBUFFER, t);
		} else {
			let t = n.textures;
			for (let i = 0; i < t.length; i++) {
				let o = t[i], c = a.convert(o.format, o.colorSpace), l = a.convert(o.type), u = b(o.internalFormat, c, l, o.normalized, o.colorSpace);
				I(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, xe(n), u, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, xe(n), u, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, u, n.width, n.height);
			}
		}
		e.bindRenderbuffer(e.RENDERBUFFER, null);
	}
	function pe(t, i, o) {
		let c = i.isWebGLCubeRenderTarget === !0;
		if (n.bindFramebuffer(e.FRAMEBUFFER, t), !(i.depthTexture && i.depthTexture.isDepthTexture)) throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
		let l = r.get(i.depthTexture);
		if (l.__renderTarget = i, (!l.__webglTexture || i.depthTexture.image.width !== i.width || i.depthTexture.image.height !== i.height) && (i.depthTexture.image.width = i.width, i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), c) {
			if (l.__webglInit === void 0 && (l.__webglInit = !0, i.depthTexture.addEventListener("dispose", C)), l.__webglTexture === void 0) {
				l.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, l.__webglTexture), P(e.TEXTURE_CUBE_MAP, i.depthTexture);
				let t = a.convert(i.depthTexture.format), r = a.convert(i.depthTexture.type), o;
				i.depthTexture.format === 1026 ? o = e.DEPTH_COMPONENT24 : i.depthTexture.format === 1027 && (o = e.DEPTH24_STENCIL8);
				for (let n = 0; n < 6; n++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, o, i.width, i.height, 0, t, r, null);
			}
		} else ne(i.depthTexture, 0);
		let u = l.__webglTexture, d = xe(i), f = c ? e.TEXTURE_CUBE_MAP_POSITIVE_X + o : e.TEXTURE_2D, p = i.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
		if (i.depthTexture.format === 1026) I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else if (i.depthTexture.format === 1027) I(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else throw Error("THREE.WebGLTextures: Unknown depthTexture format.");
	}
	function me(t) {
		let i = r.get(t), a = t.isWebGLCubeRenderTarget === !0;
		if (i.__boundDepthTexture !== t.depthTexture) {
			let e = t.depthTexture;
			if (i.__depthDisposeCallback && i.__depthDisposeCallback(), e) {
				let t = () => {
					delete i.__boundDepthTexture, delete i.__depthDisposeCallback, e.removeEventListener("dispose", t);
				};
				e.addEventListener("dispose", t), i.__depthDisposeCallback = t;
			}
			i.__boundDepthTexture = e;
		}
		if (t.depthTexture && !i.__autoAllocateDepthBuffer) if (a) for (let e = 0; e < 6; e++) pe(i.__webglFramebuffer[e], t, e);
		else {
			let e = t.texture.mipmaps;
			e && e.length > 0 ? pe(i.__webglFramebuffer[0], t, 0) : pe(i.__webglFramebuffer, t, 0);
		}
		else if (a) {
			i.__webglDepthbuffer = [];
			for (let r = 0; r < 6; r++) if (n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[r]), i.__webglDepthbuffer[r] === void 0) i.__webglDepthbuffer[r] = e.createRenderbuffer(), fe(i.__webglDepthbuffer[r], t, !1);
			else {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, a = i.__webglDepthbuffer[r];
				e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, a);
			}
		} else {
			let r = t.texture.mipmaps;
			if (r && r.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer === void 0) i.__webglDepthbuffer = e.createRenderbuffer(), fe(i.__webglDepthbuffer, t, !1);
			else {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, r = i.__webglDepthbuffer;
				e.bindRenderbuffer(e.RENDERBUFFER, r), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, r);
			}
		}
		n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function he(t, n, i) {
		let a = r.get(t);
		n !== void 0 && de(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), i !== void 0 && me(t);
	}
	function ge(t) {
		let i = t.texture, s = r.get(t), c = r.get(i);
		t.addEventListener("dispose", w);
		let l = t.textures, u = t.isWebGLCubeRenderTarget === !0, d = l.length > 1;
		if (d || (c.__webglTexture === void 0 && (c.__webglTexture = e.createTexture()), c.__version = i.version, o.memory.textures++), u) {
			s.__webglFramebuffer = [];
			for (let t = 0; t < 6; t++) if (i.mipmaps && i.mipmaps.length > 0) {
				s.__webglFramebuffer[t] = [];
				for (let n = 0; n < i.mipmaps.length; n++) s.__webglFramebuffer[t][n] = e.createFramebuffer();
			} else s.__webglFramebuffer[t] = e.createFramebuffer();
		} else {
			if (i.mipmaps && i.mipmaps.length > 0) {
				s.__webglFramebuffer = [];
				for (let t = 0; t < i.mipmaps.length; t++) s.__webglFramebuffer[t] = e.createFramebuffer();
			} else s.__webglFramebuffer = e.createFramebuffer();
			if (d) for (let t = 0, n = l.length; t < n; t++) {
				let n = r.get(l[t]);
				n.__webglTexture === void 0 && (n.__webglTexture = e.createTexture(), o.memory.textures++);
			}
			if (t.samples > 0 && I(t) === !1) {
				s.__webglMultisampledFramebuffer = e.createFramebuffer(), s.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer);
				for (let n = 0; n < l.length; n++) {
					let r = l[n];
					s.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
					let i = a.convert(r.format, r.colorSpace), o = a.convert(r.type), c = b(r.internalFormat, i, o, r.normalized, r.colorSpace, t.isXRRenderTarget === !0), u = xe(t);
					e.renderbufferStorageMultisample(e.RENDERBUFFER, u, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
				}
				e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (s.__webglDepthRenderbuffer = e.createRenderbuffer(), fe(s.__webglDepthRenderbuffer, t, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
			}
		}
		if (u) {
			n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture), P(e.TEXTURE_CUBE_MAP, i);
			for (let n = 0; n < 6; n++) if (i.mipmaps && i.mipmaps.length > 0) for (let r = 0; r < i.mipmaps.length; r++) de(s.__webglFramebuffer[n][r], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, r);
			else de(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0);
			_(i) && v(e.TEXTURE_CUBE_MAP), n.unbindTexture();
		} else if (d) {
			for (let i = 0, a = l.length; i < a; i++) {
				let a = l[i], o = r.get(a), c = e.TEXTURE_2D;
				(t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (c = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(c, o.__webglTexture), P(c, a), de(s.__webglFramebuffer, t, a, e.COLOR_ATTACHMENT0 + i, c, 0), _(a) && v(c);
			}
			n.unbindTexture();
		} else {
			let r = e.TEXTURE_2D;
			if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (r = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(r, c.__webglTexture), P(r, i), i.mipmaps && i.mipmaps.length > 0) for (let n = 0; n < i.mipmaps.length; n++) de(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, r, n);
			else de(s.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0, r, 0);
			_(i) && v(r), n.unbindTexture();
		}
		t.depthBuffer && me(t);
	}
	function _e(e) {
		let t = e.textures;
		for (let i = 0, a = t.length; i < a; i++) {
			let a = t[i];
			if (_(a)) {
				let t = y(e), i = r.get(a).__webglTexture;
				n.bindTexture(t, i), v(t), n.unbindTexture();
			}
		}
	}
	let ve = [], ye = [];
	function be(t) {
		if (t.samples > 0) {
			if (I(t) === !1) {
				let i = t.textures, a = t.width, o = t.height, s = e.COLOR_BUFFER_BIT, l = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, u = r.get(t), d = i.length > 1;
				if (d) for (let t = 0; t < i.length; t++) n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
				n.bindFramebuffer(e.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
				let f = t.texture.mipmaps;
				f && f.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer);
				for (let n = 0; n < i.length; n++) {
					if (t.resolveDepthBuffer && (t.depthBuffer && (s |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (s |= e.STENCIL_BUFFER_BIT)), d) {
						e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, u.__webglColorRenderbuffer[n]);
						let t = r.get(i[n]).__webglTexture;
						e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
					}
					e.blitFramebuffer(0, 0, a, o, 0, 0, a, o, s, e.NEAREST), c === !0 && (ve.length = 0, ye.length = 0, ve.push(e.COLOR_ATTACHMENT0 + n), t.depthBuffer && t.resolveDepthBuffer === !1 && (ve.push(l), ye.push(l), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, ye)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, ve));
				}
				if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), d) for (let t = 0; t < i.length; t++) {
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, u.__webglColorRenderbuffer[t]);
					let a = r.get(i[t]).__webglTexture;
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, a, 0);
				}
				n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
			} else if (t.depthBuffer && t.resolveDepthBuffer === !1 && c) {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
				e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
			}
		}
	}
	function xe(e) {
		return Math.min(i.maxSamples, e.samples);
	}
	function I(e) {
		let n = r.get(e);
		return e.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && n.__useRenderToTexture !== !1;
	}
	function Se(e) {
		let t = o.render.frame;
		u.get(e) !== t && (u.set(e, t), e.update());
	}
	function Ce(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (X.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && W("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : G("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function we(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (l.width = e.naturalWidth || e.width, l.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (l.width = e.displayWidth, l.height = e.displayHeight) : (l.width = e.width, l.height = e.height), l;
	}
	this.allocateTextureUnit = te, this.resetTextureUnits = k, this.getTextureUnits = A, this.setTextureUnits = ee, this.setTexture2D = ne, this.setTexture2DArray = M, this.setTexture3D = N, this.setTextureCube = re, this.rebindTextures = he, this.setupRenderTarget = ge, this.updateRenderTargetMipmap = _e, this.updateMultisampleRenderTarget = be, this.setupDepthRenderbuffer = me, this.setupFrameBufferTexture = de, this.useMultisampledRTT = I, this.isReversedDepthBuffer = function() {
		return n.buffers.depth.getReversed();
	};
}
function yg(e, t) {
	function n(n, r = "") {
		let i, a = X.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) if (a === "srgb") if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
			if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
			if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
			if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
			if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
		} else return null;
		else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
			if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
		} else return null;
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
			if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
			if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
			if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
			if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
		} else return null;
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
			if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
			if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
			if (n === 37488) return i.COMPRESSED_R11_EAC;
			if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
			if (n === 37490) return i.COMPRESSED_RG11_EAC;
			if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
		} else return null;
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
			if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
			if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
			if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
			if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
			if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
			if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
			if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
			if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
			if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
			if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
			if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
			if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
			if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
			if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
		} else return null;
		if (n === 36492 || n === 36494 || n === 36495) if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
			if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
			if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
			if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
		} else return null;
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
			if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
			if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
			if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
			if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
		} else return null;
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var bg = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", xg = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", Sg = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new af(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new gf({
				vertexShader: bg,
				fragmentShader: xg,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new Ud(new sf(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, Cg = class extends Yc {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, o = "local-floor", s = 1, c = null, l = null, u = null, d = null, f = null, p = null, m = typeof XRWebGLBinding < "u", h = new Sg(), g = {}, _ = t.getContextAttributes(), v = null, y = null, b = [], x = [], S = new q(), C = null, w = new Jf();
		w.viewport = new zl();
		let T = new Jf();
		T.viewport = new zl();
		let E = [w, T], D = new $f(), O = null, k = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = b[e];
			return t === void 0 && (t = new bu(), b[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = b[e];
			return t === void 0 && (t = new bu(), b[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = b[e];
			return t === void 0 && (t = new bu(), b[e] = t), t.getHandSpace();
		};
		function A(e) {
			let t = x.indexOf(e.inputSource);
			if (t === -1) return;
			let n = b[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, c || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function ee() {
			r.removeEventListener("select", A), r.removeEventListener("selectstart", A), r.removeEventListener("selectend", A), r.removeEventListener("squeeze", A), r.removeEventListener("squeezestart", A), r.removeEventListener("squeezeend", A), r.removeEventListener("end", ee), r.removeEventListener("inputsourceschange", te);
			for (let e = 0; e < b.length; e++) {
				let t = x[e];
				t !== null && (x[e] = null, b[e].disconnect(t));
			}
			O = null, k = null, h.reset();
			for (let e in g) delete g[e];
			e.setRenderTarget(v), f = null, d = null, u = null, r = null, y = null, oe.stop(), n.isPresenting = !1, e.setPixelRatio(C), e.setSize(S.width, S.height, !1), n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && W("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			o = e, n.isPresenting === !0 && W("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return c || a;
		}, this.setReferenceSpace = function(e) {
			c = e;
		}, this.getBaseLayer = function() {
			return d === null ? f : d;
		}, this.getBinding = function() {
			return u === null && m && (u = new XRWebGLBinding(r, t)), u;
		}, this.getFrame = function() {
			return p;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(l) {
			if (r = l, r !== null) {
				if (v = e.getRenderTarget(), r.addEventListener("select", A), r.addEventListener("selectstart", A), r.addEventListener("selectend", A), r.addEventListener("squeeze", A), r.addEventListener("squeezestart", A), r.addEventListener("squeezeend", A), r.addEventListener("end", ee), r.addEventListener("inputsourceschange", te), _.xrCompatible !== !0 && await t.makeXRCompatible(), C = e.getPixelRatio(), e.getSize(S), m && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, o = null;
					_.depth && (o = _.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = _.stencil ? Fs : Ps, a = _.stencil ? Os : Cs);
					let s = {
						colorFormat: t.RGBA8,
						depthFormat: o,
						scaleFactor: i
					};
					u = this.getBinding(), d = u.createProjectionLayer(s), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), y = new Vl(d.textureWidth, d.textureHeight, {
						format: Ns,
						type: vs,
						depthTexture: new nf(d.textureWidth, d.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: _.stencil,
						colorSpace: e.outputColorSpace,
						samples: _.antialias ? 4 : 0,
						resolveDepthBuffer: d.ignoreDepthValues === !1,
						resolveStencilBuffer: d.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: _.antialias,
						alpha: !0,
						depth: _.depth,
						stencil: _.stencil,
						framebufferScaleFactor: i
					};
					f = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new Vl(f.framebufferWidth, f.framebufferHeight, {
						format: Ns,
						type: vs,
						colorSpace: e.outputColorSpace,
						stencilBuffer: _.stencil,
						resolveDepthBuffer: f.ignoreDepthValues === !1,
						resolveStencilBuffer: f.ignoreDepthValues === !1
					});
				}
				y.isXRRenderTarget = !0, this.setFoveation(s), c = null, a = await r.requestReferenceSpace(o), oe.setContext(r), oe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return h.getDepthTexture();
		};
		function te(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = x.indexOf(n);
				r >= 0 && (x[r] = null, b[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = x.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < b.length; e++) if (e >= x.length) {
						x.push(n), r = e;
						break;
					} else if (x[e] === null) {
						x[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = b[r];
				i && i.connect(n);
			}
		}
		let j = new J(), ne = new J();
		function M(e, t, n) {
			j.setFromMatrixPosition(t.matrixWorld), ne.setFromMatrixPosition(n.matrixWorld);
			let r = j.distanceTo(ne), i = t.projectionMatrix.elements, a = n.projectionMatrix.elements, o = i[14] / (i[10] - 1), s = i[14] / (i[10] + 1), c = (i[9] + 1) / i[5], l = (i[9] - 1) / i[5], u = (i[8] - 1) / i[0], d = (a[8] + 1) / a[0], f = o * u, p = o * d, m = r / (-u + d), h = m * -u;
			if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(h), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), i[10] === -1) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse);
			else {
				let t = o + m, n = s + m, i = f - h, a = p + (r - h), u = c * s / n * t, d = l * s / n * t;
				e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
			}
		}
		function N(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			h.texture !== null && (h.depthNear > 0 && (t = h.depthNear), h.depthFar > 0 && (n = h.depthFar)), D.near = T.near = w.near = t, D.far = T.far = w.far = n, (O !== D.near || k !== D.far) && (r.updateRenderState({
				depthNear: D.near,
				depthFar: D.far
			}), O = D.near, k = D.far), D.layers.mask = e.layers.mask | 6, w.layers.mask = D.layers.mask & -5, T.layers.mask = D.layers.mask & -3;
			let i = e.parent, a = D.cameras;
			N(D, i);
			for (let e = 0; e < a.length; e++) N(a[e], i);
			a.length === 2 ? M(D, w, T) : D.projectionMatrix.copy(w.projectionMatrix), re(e, D, i);
		};
		function re(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = $c * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return D;
		}, this.getFoveation = function() {
			if (!(d === null && f === null)) return s;
		}, this.setFoveation = function(e) {
			s = e, d !== null && (d.fixedFoveation = e), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return h.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return h.getMesh(D);
		}, this.getCameraTexture = function(e) {
			return g[e];
		};
		let ie = null;
		function ae(t, i) {
			if (l = i.getViewerPose(c || a), p = i, l !== null) {
				let t = l.views;
				f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y));
				let i = !1;
				t.length !== D.cameras.length && (D.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (f !== null) a = f.getViewport(r);
					else {
						let t = u.getViewSubImage(d, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(y, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(y));
					}
					let o = E[n];
					o === void 0 && (o = new Jf(), o.layers.enable(n), o.viewport = new zl(), E[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (D.matrix.copy(o.matrix), D.matrix.decompose(D.position, D.quaternion, D.scale)), i === !0 && D.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && m) {
					u = n.getBinding();
					let e = u.getDepthInformation(t[0]);
					e && e.isValid && e.texture && h.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && m) {
					e.state.unbindTexture(), u = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = g[n];
							e || (e = new af(), g[n] = e);
							let t = u.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < b.length; e++) {
				let t = x[e], n = b[e];
				t !== null && n !== void 0 && n.update(t, i, c || a);
			}
			ie && ie(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), p = null;
		}
		let oe = new gp();
		oe.setAnimationLoop(ae), this.setAnimationLoop = function(e) {
			ie = e;
		}, this.dispose = function() {};
	}
}, wg = /*@__PURE__*/ new Wl(), Tg = /*@__PURE__*/ new Y();
Tg.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Eg(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, ff(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(wg.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(Tg), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function Dg(e, t, n, r) {
	let i = {}, a = {}, o = [], s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
	function c(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n);
	}
	function l(e, n) {
		let o = i[e.id];
		o === void 0 && (g(e), o = u(e), i[e.id] = o, e.addEventListener("dispose", v));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let c = t.render.frame;
		a[e.id] !== c && (f(e), a[e.id] = c);
	}
	function u(t) {
		let n = d();
		t.__bindingPointIndex = n;
		let r = e.createBuffer(), i = t.__size, a = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, r), e.bufferData(e.UNIFORM_BUFFER, i, a), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, r), r;
	}
	function d() {
		for (let e = 0; e < s; e++) if (o.indexOf(e) === -1) return o.push(e), e;
		return G("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
	}
	function f(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let e = 0, t = r.length; e < t; e++) {
			let t = r[e];
			if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) p(t[n], e, n, a);
			else p(t, e, 0, a);
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function p(t, n, r, i) {
		if (h(t, n, r, i) === !0) {
			let n = t.__offset, r = t.value;
			if (Array.isArray(r)) {
				let e = 0;
				for (let n = 0; n < r.length; n++) {
					let i = r[n], a = _(i);
					m(i, t.__data, e), typeof i != "number" && typeof i != "boolean" && !i.isMatrix3 && !ArrayBuffer.isView(i) && (e += a.storage / Float32Array.BYTES_PER_ELEMENT);
				}
			} else m(r, t.__data, 0);
			e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
		}
	}
	function m(e, t, n) {
		typeof e == "number" || typeof e == "boolean" ? t[0] = e : e.isMatrix3 ? (t[0] = e.elements[0], t[1] = e.elements[1], t[2] = e.elements[2], t[3] = 0, t[4] = e.elements[3], t[5] = e.elements[4], t[6] = e.elements[5], t[7] = 0, t[8] = e.elements[6], t[9] = e.elements[7], t[10] = e.elements[8], t[11] = 0) : ArrayBuffer.isView(e) ? t.set(new e.constructor(e.buffer, e.byteOffset, t.length)) : e.toArray(t, n);
	}
	function h(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (r[a] === void 0) return typeof i == "number" || typeof i == "boolean" ? r[a] = i : ArrayBuffer.isView(i) ? r[a] = i.slice() : r[a] = i.clone(), !0;
		{
			let e = r[a];
			if (typeof i == "number" || typeof i == "boolean") {
				if (e !== i) return r[a] = i, !0;
			} else if (ArrayBuffer.isView(i)) return !0;
			else if (e.equals(i) === !1) return e.copy(i), !0;
		}
		return !1;
	}
	function g(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let e = 0, t = r.length; e < t; e++) {
				let t = r[e], i = Array.isArray(t.value) ? t.value : [t.value];
				for (let e = 0, r = i.length; e < r; e++) {
					let r = i[e], a = _(r), o = n % 16, s = o % a.boundary, c = o + s;
					n += s, c !== 0 && 16 - c < a.storage && (n += 16 - c), t.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += a.storage;
				}
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function _(e) {
		let t = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? W("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : W("WebGLRenderer: Unsupported uniform value type.", e), t;
	}
	function v(t) {
		let n = t.target;
		n.removeEventListener("dispose", v);
		let r = o.indexOf(n.__bindingPointIndex);
		o.splice(r, 1), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function y() {
		for (let t in i) e.deleteBuffer(i[t]);
		o = [], i = {}, a = {};
	}
	return {
		bind: c,
		update: l,
		dispose: y
	};
}
var Og = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), kg = null;
function Ag() {
	return kg === null && (kg = new Kd(Og, 16, 16, Rs, Ts), kg.name = "DFG_LUT", kg.minFilter = hs, kg.magFilter = hs, kg.wrapS = us, kg.wrapT = us, kg.generateMipmaps = !1, kg.needsUpdate = !0), kg;
}
var jg = class {
	constructor(e = {}) {
		let { canvas: t = Vc(), context: n = null, depth: r = !0, stencil: i = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: s = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1, outputBufferType: f = vs } = e;
		this.isWebGLRenderer = !0;
		let p;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			p = n.getContextAttributes().alpha;
		} else p = a;
		let m = f, h = /* @__PURE__ */ new Set([
			Bs,
			zs,
			Ls
		]), g = /* @__PURE__ */ new Set([
			vs,
			Cs,
			xs,
			Os,
			Es,
			Ds
		]), _ = /* @__PURE__ */ new Uint32Array(4), v = /* @__PURE__ */ new Int32Array(4), y = new J(), b = null, x = null, S = [], C = [], w = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let T = this, E = !1, D = null, O = null, k = null, A = null;
		this._outputColorSpace = jc;
		let ee = 0, te = 0, j = null, ne = -1, M = null, N = new zl(), re = new zl(), ie = null, ae = new Z(0), oe = 0, P = t.width, se = t.height, F = 1, ce = null, le = null, ue = new zl(0, 0, P, se), de = new zl(0, 0, P, se), fe = !1, pe = new ef(), me = !1, he = !1, ge = new Wl(), _e = new J(), ve = new zl(), ye = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, be = !1;
		function xe() {
			return j === null ? F : 1;
		}
		let I = n;
		function Se(e, n) {
			return t.getContext(e, n);
		}
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: o,
				premultipliedAlpha: s,
				preserveDrawingBuffer: c,
				powerPreference: l,
				failIfMajorPerformanceCaveat: u
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r185"), t.addEventListener("webglcontextlost", Ue, !1), t.addEventListener("webglcontextrestored", We, !1), t.addEventListener("webglcontextcreationerror", Ge, !1), I === null) {
				let t = "webgl2";
				if (I = Se(t, e), I === null) throw Se(t) ? Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : Error("THREE.WebGLRenderer: Error creating WebGL context.");
			}
		} catch (e) {
			throw G("WebGLRenderer: " + e.message), e;
		}
		let Ce, we, L, Te, R, z, B, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve;
		function He() {
			Ce = new Yp(I), Ce.init(), ze = new yg(I, Ce), we = new Tp(I, Ce, e, ze), L = new _g(I, Ce), we.reversedDepthBuffer && d && L.buffers.depth.setReversed(!0), O = I.createFramebuffer(), k = I.createFramebuffer(), A = I.createFramebuffer(), Te = new Qp(I), R = new Zh(), z = new vg(I, Ce, L, R, we, ze, Te), B = new Jp(T), Ee = new _p(I), Be = new Cp(I, Ee), De = new Xp(I, Ee, Te, Be), Oe = new em(I, De, Ee, Be, Te), Ie = new $p(I, we, z), Ne = new Ep(R), ke = new Xh(T, B, Ce, we, Be, Ne), Ae = new Eg(T, R), je = new tg(), Me = new cg(Ce), Fe = new Sp(T, B, L, Oe, p, s), Pe = new gg(T, Oe, we), Ve = new Dg(I, Te, we, L), Le = new wp(I, Ce, Te), Re = new Zp(I, Ce, Te), Te.programs = ke.programs, T.capabilities = we, T.extensions = Ce, T.properties = R, T.renderLists = je, T.shadowMap = Pe, T.state = L, T.info = Te;
		}
		He(), m !== 1009 && (w = new nm(m, t.width, t.height, o, r, i));
		let V = new Cg(T, I);
		this.xr = V, this.getContext = function() {
			return I;
		}, this.getContextAttributes = function() {
			return I.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = Ce.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = Ce.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return F;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (F = e, this.setSize(P, se, !1));
		}, this.getSize = function(e) {
			return e.set(P, se);
		}, this.setSize = function(e, n, r = !0) {
			if (V.isPresenting) {
				W("WebGLRenderer: Can't change size while VR device is presenting.");
				return;
			}
			P = e, se = n, t.width = Math.floor(e * F), t.height = Math.floor(n * F), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), w !== null && w.setSize(t.width, t.height), this.setViewport(0, 0, e, n);
		}, this.getDrawingBufferSize = function(e) {
			return e.set(P * F, se * F).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			P = e, se = n, F = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (m === 1009) {
				G("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
				return;
			}
			if (e) {
				for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
					W("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
					break;
				}
			}
			w.setEffects(e || []);
		}, this.getCurrentViewport = function(e) {
			return e.copy(N);
		}, this.getViewport = function(e) {
			return e.copy(ue);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? ue.set(e.x, e.y, e.z, e.w) : ue.set(e, t, n, r), L.viewport(N.copy(ue).multiplyScalar(F).round());
		}, this.getScissor = function(e) {
			return e.copy(de);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? de.set(e.x, e.y, e.z, e.w) : de.set(e, t, n, r), L.scissor(re.copy(de).multiplyScalar(F).round());
		}, this.getScissorTest = function() {
			return fe;
		}, this.setScissorTest = function(e) {
			L.setScissorTest(fe = e);
		}, this.setOpaqueSort = function(e) {
			ce = e;
		}, this.setTransparentSort = function(e) {
			le = e;
		}, this.getClearColor = function(e) {
			return e.copy(Fe.getClearColor());
		}, this.setClearColor = function() {
			Fe.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Fe.getClearAlpha();
		}, this.setClearAlpha = function() {
			Fe.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (j !== null) {
					let t = j.texture.format;
					e = h.has(t);
				}
				if (e) {
					let e = j.texture.type, t = g.has(e), n = Fe.getClearColor(), r = Fe.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (_[0] = i, _[1] = a, _[2] = o, _[3] = r, I.clearBufferuiv(I.COLOR, 0, _)) : (v[0] = i, v[1] = a, v[2] = o, v[3] = r, I.clearBufferiv(I.COLOR, 0, v));
				} else r |= I.COLOR_BUFFER_BIT;
			}
			t && (r |= I.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && I.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), D = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", Ue, !1), t.removeEventListener("webglcontextrestored", We, !1), t.removeEventListener("webglcontextcreationerror", Ge, !1), Fe.dispose(), je.dispose(), Me.dispose(), R.dispose(), B.dispose(), Oe.dispose(), Be.dispose(), Ve.dispose(), ke.dispose(), V.dispose(), V.removeEventListener("sessionstart", Qe), V.removeEventListener("sessionend", $e), et.stop();
		};
		function Ue(e) {
			e.preventDefault(), Wc("WebGLRenderer: Context Lost."), E = !0;
		}
		function We() {
			Wc("WebGLRenderer: Context Restored."), E = !1;
			let e = Te.autoReset, t = Pe.enabled, n = Pe.autoUpdate, r = Pe.needsUpdate, i = Pe.type;
			He(), Te.autoReset = e, Pe.enabled = t, Pe.autoUpdate = n, Pe.needsUpdate = r, Pe.type = i;
		}
		function Ge(e) {
			G("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function Ke(e) {
			let t = e.target;
			t.removeEventListener("dispose", Ke), qe(t);
		}
		function qe(e) {
			Je(e), R.remove(e);
		}
		function Je(e) {
			let t = R.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				ke.releaseProgram(e);
			}), e.isShaderMaterial && ke.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = ye);
			let o = i.isMesh && i.matrixWorld.determinantAffine() < 0, s = ut(e, t, n, r, i);
			L.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = De.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			Be.setup(i, r, s, n, c);
			let h, g = Le;
			if (c !== null && (h = Ee.get(c), g = Re, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (L.setLineWidth(r.wireframeLinewidth * xe()), g.setMode(I.LINES)) : g.setMode(I.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), L.setLineWidth(e * xe()), i.isLineSegments ? g.setMode(I.LINES) : i.isLineLoop ? g.setMode(I.LINE_LOOP) : g.setMode(I.LINE_STRIP);
			} else i.isPoints ? g.setMode(I.POINTS) : i.isSprite && g.setMode(I.TRIANGLES);
			if (i.isBatchedMesh) if (Ce.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
			else {
				let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? Ee.get(c).bytesPerElement : 1, o = R.get(r).currentProgram.getUniforms();
				for (let r = 0; r < n; r++) o.setValue(I, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
			}
			else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function Ye(e, t, n) {
			e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, ot(e, t, n), e.side = 0, e.needsUpdate = !0, ot(e, t, n), e.side = 2) : ot(e, t, n);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), x = Me.get(n), x.init(t), C.push(x), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e));
			}), x.setupLights();
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let t = e.material;
				if (t) if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
					let a = t[i];
					Ye(a, n, e), r.add(a);
				}
				else Ye(t, n, e), r.add(t);
			}), x = C.pop(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					if (r.forEach(function(e) {
						R.get(e).currentProgram.isReady() && r.delete(e);
					}), r.size === 0) {
						t(e);
						return;
					}
					setTimeout(n, 10);
				}
				Ce.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let Xe = null;
		function Ze(e) {
			Xe && Xe(e);
		}
		function Qe() {
			et.stop();
		}
		function $e() {
			et.start();
		}
		let et = new gp();
		et.setAnimationLoop(Ze), typeof self < "u" && et.setContext(self), this.setAnimationLoop = function(e) {
			Xe = e, V.setAnimationLoop(e), e === null ? et.stop() : et.start();
		}, V.addEventListener("sessionstart", Qe), V.addEventListener("sessionend", $e), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				G("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (E === !0) return;
			D !== null && D.renderStart(e, t);
			let n = V.enabled === !0 && V.isPresenting === !0, r = w !== null && (j === null || n) && w.begin(T, j);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (w === null || w.isCompositing() === !1) && (V.cameraAutoUpdate === !0 && V.updateCamera(t), t = V.getCamera()), e.isScene === !0 && e.onBeforeRender(T, e, t, j), x = Me.get(e, C.length), x.init(t), x.state.textureUnits = z.getTextureUnits(), C.push(x), ge.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), pe.setFromProjectionMatrix(ge, Lc, t.reversedDepth), he = this.localClippingEnabled, me = Ne.init(this.clippingPlanes, he), b = je.get(e, S.length), b.init(), S.push(b), V.enabled === !0 && V.isPresenting === !0) {
				let e = T.xr.getDepthSensingMesh();
				e !== null && tt(e, t, -Infinity, T.sortObjects);
			}
			tt(e, t, 0, T.sortObjects), b.finish(), T.sortObjects === !0 && b.sort(ce, le, t.reversedDepth), be = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, be && Fe.addToRenderList(b, e), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), me === !0 && Ne.beginShadows();
			let i = x.state.shadowsArray;
			if (Pe.render(i, e, t), me === !0 && Ne.endShadows(), (r && w.hasRenderPass()) === !1) {
				let n = b.opaque, r = b.transmissive;
				if (x.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						rt(n, r, e, a);
					}
					be && Fe.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						nt(b, e, n, n.viewport);
					}
				} else r.length > 0 && rt(n, r, e, t), be && Fe.render(e), nt(b, e, t);
			}
			j !== null && te === 0 && (z.updateMultisampleRenderTarget(j), z.updateRenderTargetMipmap(j)), r && w.end(T), e.isScene === !0 && e.onAfterRender(T, e, t), Be.resetDefaultState(), ne = -1, M = null, C.pop(), C.length > 0 ? (x = C[C.length - 1], z.setTextureUnits(x.state.textureUnits), me === !0 && Ne.setGlobalState(T.clippingPlanes, x.state.camera)) : x = null, S.pop(), b = S.length > 0 ? S[S.length - 1] : null, D !== null && D.renderEnd();
		};
		function tt(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLightProbeGrid) x.pushLightProbeGrid(e);
				else if (e.isLight) x.pushLight(e), e.castShadow && x.pushShadow(e);
				else if (e.isSprite) {
					if (!e.frustumCulled || pe.intersectsSprite(e)) {
						r && ve.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ge);
						let t = Oe.update(e), i = e.material;
						i.visible && b.push(e, t, i, n, ve.z, null);
					}
				} else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || pe.intersectsObject(e))) {
					let t = Oe.update(e), i = e.material;
					if (r && (e.boundingSphere === void 0 ? (t.boundingSphere === null && t.computeBoundingSphere(), ve.copy(t.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), ve.copy(e.boundingSphere.center)), ve.applyMatrix4(e.matrixWorld).applyMatrix4(ge)), Array.isArray(i)) {
						let r = t.groups;
						for (let a = 0, o = r.length; a < o; a++) {
							let o = r[a], s = i[o.materialIndex];
							s && s.visible && b.push(e, t, s, n, ve.z, o);
						}
					} else i.visible && b.push(e, t, i, n, ve.z, null);
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) tt(i[e], t, n, r);
		}
		function nt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			x.setupLightsView(n), me === !0 && Ne.setGlobalState(T.clippingPlanes, n), r && L.viewport(N.copy(r)), i.length > 0 && it(i, t, n), a.length > 0 && it(a, t, n), o.length > 0 && it(o, t, n), L.buffers.depth.setTest(!0), L.buffers.depth.setMask(!0), L.buffers.color.setMask(!0), L.setPolygonOffset(!1);
		}
		function rt(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (x.state.transmissionRenderTarget[r.id] === void 0) {
				let e = Ce.has("EXT_color_buffer_half_float") || Ce.has("EXT_color_buffer_float");
				x.state.transmissionRenderTarget[r.id] = new Vl(1, 1, {
					generateMipmaps: !0,
					type: e ? Ts : vs,
					minFilter: _s,
					samples: Math.max(4, we.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					colorSpace: X.workingColorSpace
				});
			}
			let a = x.state.transmissionRenderTarget[r.id], o = r.viewport || N;
			a.setSize(o.z * T.transmissionResolutionScale, o.w * T.transmissionResolutionScale);
			let s = T.getRenderTarget(), c = T.getActiveCubeFace(), l = T.getActiveMipmapLevel();
			T.setRenderTarget(a), T.getClearColor(ae), oe = T.getClearAlpha(), oe < 1 && T.setClearColor(16777215, .5), T.clear(), be && Fe.render(n);
			let u = T.toneMapping;
			T.toneMapping = 0;
			let d = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), x.setupLightsView(r), me === !0 && Ne.setGlobalState(T.clippingPlanes, r), it(e, n, r), z.updateMultisampleRenderTarget(a), z.updateRenderTargetMipmap(a), Ce.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, at(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (z.updateMultisampleRenderTarget(a), z.updateRenderTargetMipmap(a));
			}
			T.setRenderTarget(s, c, l), T.setClearColor(ae, oe), d !== void 0 && (r.viewport = d), T.toneMapping = u;
		}
		function it(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && at(o, t, n, s, l, c);
			}
		}
		function at(e, t, n, r, i, a) {
			e.onBeforeRender(T, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(T, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : T.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(T, t, n, r, i, a);
		}
		function ot(e, t, n) {
			t.isScene !== !0 && (t = ye);
			let r = R.get(e), i = x.state.lights, a = x.state.shadowsArray, o = i.state.version, s = ke.getParameters(e, i.state, a, t, n, x.state.lightProbeGridArray), c = ke.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = B.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", Ke), l = /* @__PURE__ */ new Map(), r.programs = l);
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return ct(e, s), d;
			} else s.uniforms = ke.getUniforms(e), D !== null && e.isNodeMaterial && D.build(e, n, s), e.onBeforeCompile(s, T), d = ke.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = Ne.uniform), ct(e, s), r.needsLights = ft(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.lightProbeGrid = x.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d;
		}
		function st(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = lh.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function ct(e, t) {
			let n = R.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function lt(e, t) {
			if (e.length === 0) return null;
			if (e.length === 1) return e[0].texture === null ? null : e[0];
			y.setFromMatrixPosition(t.matrixWorld);
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				if (n.texture !== null && n.boundingBox.containsPoint(y)) return n;
			}
			return null;
		}
		function ut(e, t, n, r, i) {
			t.isScene !== !0 && (t = ye), z.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = j === null ? T.outputColorSpace : j.isXRRenderTarget === !0 ? j.texture.colorSpace : X.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = B.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (j === null || j.isXRRenderTarget === !0) && (h = T.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = R.get(r), y = x.state.lights;
			if (me === !0 && (he === !0 || e !== M)) {
				let t = e === M && r.id === ne;
				Ne.setState(r, e, t);
			}
			let b = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version ? b = !0 : v.outputColorSpace === s ? i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i.colorTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i.colorTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== Ne.numPlanes || v.numIntersection !== Ne.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.toneMapping === h && v.morphTargetsCount === _ ? !!v.lightProbeGrid != x.state.lightProbeGridArray.length > 0 && (b = !0) : b = !0 : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let S = v.currentProgram;
			b === !0 && (S = ot(r, t, i), D && r.isNodeMaterial && D.onUpdateProgram(r, S, v));
			let C = !1, w = !1, E = !1, O = S.getUniforms(), k = v.uniforms;
			if (L.useProgram(S.program) && (C = !0, w = !0, E = !0), r.id !== ne && (ne = r.id, w = !0), v.needsLights) {
				let e = lt(x.state.lightProbeGridArray, i);
				v.lightProbeGrid !== e && (v.lightProbeGrid = e, w = !0);
			}
			if (C || M !== e) {
				L.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), O.setValue(I, "projectionMatrix", e.projectionMatrix), O.setValue(I, "viewMatrix", e.matrixWorldInverse);
				let t = O.map.cameraPosition;
				t !== void 0 && t.setValue(I, _e.setFromMatrixPosition(e.matrixWorld)), we.logarithmicDepthBuffer && O.setValue(I, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && O.setValue(I, "isOrthographic", e.isOrthographicCamera === !0), M !== e && (M = e, w = !0, E = !0);
			}
			if (v.needsLights && (y.state.directionalShadowMap.length > 0 && O.setValue(I, "directionalShadowMap", y.state.directionalShadowMap, z), y.state.spotShadowMap.length > 0 && O.setValue(I, "spotShadowMap", y.state.spotShadowMap, z), y.state.pointShadowMap.length > 0 && O.setValue(I, "pointShadowMap", y.state.pointShadowMap, z)), i.isSkinnedMesh) {
				O.setOptional(I, i, "bindMatrix"), O.setOptional(I, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), O.setValue(I, "boneTexture", e.boneTexture, z));
			}
			i.isBatchedMesh && (O.setOptional(I, i, "batchingTexture"), O.setValue(I, "batchingTexture", i._matricesTexture, z), O.setOptional(I, i, "batchingIdTexture"), O.setValue(I, "batchingIdTexture", i._indirectTexture, z), O.setOptional(I, i, "batchingColorTexture"), i._colorsTexture !== null && O.setValue(I, "batchingColorTexture", i._colorsTexture, z));
			let A = n.morphAttributes;
			if ((A.position !== void 0 || A.normal !== void 0 || A.color !== void 0) && Ie.update(i, n, S), (w || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, O.setValue(I, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (k.envMapIntensity.value = t.environmentIntensity), k.dfgLUT !== void 0 && (k.dfgLUT.value = Ag()), w) {
				if (O.setValue(I, "toneMappingExposure", T.toneMappingExposure), v.needsLights && dt(k, E), a && r.fog === !0 && Ae.refreshFogUniforms(k, a), Ae.refreshMaterialUniforms(k, r, F, se, x.state.transmissionRenderTarget[e.id]), v.needsLights && v.lightProbeGrid) {
					let e = v.lightProbeGrid;
					k.probesSH.value = e.texture, k.probesMin.value.copy(e.boundingBox.min), k.probesMax.value.copy(e.boundingBox.max), k.probesResolution.value.copy(e.resolution);
				}
				lh.upload(I, st(v), k, z);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (lh.upload(I, st(v), k, z), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && O.setValue(I, "center", i.center), O.setValue(I, "modelViewMatrix", i.modelViewMatrix), O.setValue(I, "normalMatrix", i.normalMatrix), O.setValue(I, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					Ve.update(n, S), Ve.bind(n, S);
				}
			}
			return S;
		}
		function dt(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function ft(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return ee;
		}, this.getActiveMipmapLevel = function() {
			return te;
		}, this.getRenderTarget = function() {
			return j;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = R.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), R.get(e.texture).__webglTexture = t, R.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = R.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		}, this.setRenderTarget = function(e, t = 0, n = 0) {
			j = e, ee = t, te = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = R.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					L.bindFramebuffer(I.FRAMEBUFFER, o.__webglFramebuffer), N.copy(e.viewport), re.copy(e.scissor), ie = e.scissorTest, L.viewport(N), L.scissor(re), L.setScissorTest(ie), ne = -1;
					return;
				} else if (o.__webglFramebuffer === void 0) z.setupRenderTarget(e);
				else if (o.__hasExternalTextures) z.rebindTextures(e, R.get(e.texture).__webglTexture, R.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && R.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
						z.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = R.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && z.useMultisampledRTT(e) === !1 ? R.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, N.copy(e.viewport), re.copy(e.scissor), ie = e.scissorTest;
			} else N.copy(ue).multiplyScalar(F).floor(), re.copy(de).multiplyScalar(F).floor(), ie = fe;
			if (n !== 0 && (r = O), L.bindFramebuffer(I.FRAMEBUFFER, r) && L.drawBuffers(e, r), L.viewport(N), L.scissor(re), L.setScissorTest(ie), i) {
				let r = R.get(e.texture);
				I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = R.get(e.textures[t]);
					I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = R.get(e.texture);
				I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, t.__webglTexture, n);
			}
			ne = -1;
		}, this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				G("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = R.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) {
				L.bindFramebuffer(I.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					if (e.textures.length > 1 && I.readBuffer(I.COLOR_ATTACHMENT0 + s), !we.textureFormatReadable(c)) {
						G("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (!we.textureTypeReadable(l)) {
						G("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && I.readPixels(t, n, r, i, ze.convert(c), ze.convert(l), a);
				} finally {
					let e = j === null ? null : R.get(j).__webglFramebuffer;
					L.bindFramebuffer(I.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = R.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
				L.bindFramebuffer(I.FRAMEBUFFER, c);
				let o = e.textures[s], l = o.format, u = o.type;
				if (e.textures.length > 1 && I.readBuffer(I.COLOR_ATTACHMENT0 + s), !we.textureFormatReadable(l)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
				if (!we.textureTypeReadable(u)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
				let d = I.createBuffer();
				I.bindBuffer(I.PIXEL_PACK_BUFFER, d), I.bufferData(I.PIXEL_PACK_BUFFER, a.byteLength, I.STREAM_READ), I.readPixels(t, n, r, i, ze.convert(l), ze.convert(u), 0);
				let f = j === null ? null : R.get(j).__webglFramebuffer;
				L.bindFramebuffer(I.FRAMEBUFFER, f);
				let p = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
				return I.flush(), await qc(I, p, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, d), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, a), I.deleteBuffer(d), I.deleteSync(p), a;
			} else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			z.setTexture2D(e, 0), I.copyTexSubImage2D(I.TEXTURE_2D, n, 0, 0, o, s, i, a), L.unbindTexture();
		}, this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = ze.convert(t.format), _ = ze.convert(t.type), v;
			t.isData3DTexture ? (z.setTexture3D(t, 0), v = I.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (z.setTexture2DArray(t, 0), v = I.TEXTURE_2D_ARRAY) : (z.setTexture2D(t, 0), v = I.TEXTURE_2D), L.activeTexture(I.TEXTURE0), L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, t.flipY), L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), L.pixelStorei(I.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = L.getParameter(I.UNPACK_ROW_LENGTH), b = L.getParameter(I.UNPACK_IMAGE_HEIGHT), x = L.getParameter(I.UNPACK_SKIP_PIXELS), S = L.getParameter(I.UNPACK_SKIP_ROWS), C = L.getParameter(I.UNPACK_SKIP_IMAGES);
			L.pixelStorei(I.UNPACK_ROW_LENGTH, h.width), L.pixelStorei(I.UNPACK_IMAGE_HEIGHT, h.height), L.pixelStorei(I.UNPACK_SKIP_PIXELS, l), L.pixelStorei(I.UNPACK_SKIP_ROWS, u), L.pixelStorei(I.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = R.get(e), r = R.get(t), h = R.get(n.__renderTarget), g = R.get(r.__renderTarget);
				L.bindFramebuffer(I.READ_FRAMEBUFFER, h.__webglFramebuffer), L.bindFramebuffer(I.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, R.get(e).__webglTexture, i, d + n), I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, R.get(t).__webglTexture, a, m + n)), I.blitFramebuffer(l, u, o, s, f, p, o, s, I.DEPTH_BUFFER_BIT, I.NEAREST);
				L.bindFramebuffer(I.READ_FRAMEBUFFER, null), L.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || R.has(e)) {
				let n = R.get(e), r = R.get(t);
				L.bindFramebuffer(I.READ_FRAMEBUFFER, k), L.bindFramebuffer(I.DRAW_FRAMEBUFFER, A);
				for (let e = 0; e < c; e++) w ? I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : I.framebufferTexture2D(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, n.__webglTexture, i), T ? I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : I.framebufferTexture2D(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? I.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : I.copyTexSubImage2D(v, a, f, p, l, u, o, s) : I.blitFramebuffer(l, u, o, s, f, p, o, s, I.COLOR_BUFFER_BIT, I.NEAREST);
				L.bindFramebuffer(I.READ_FRAMEBUFFER, null), L.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? I.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? I.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : I.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : I.texSubImage2D(I.TEXTURE_2D, a, f, p, o, s, g, _, h);
			L.pixelStorei(I.UNPACK_ROW_LENGTH, y), L.pixelStorei(I.UNPACK_IMAGE_HEIGHT, b), L.pixelStorei(I.UNPACK_SKIP_PIXELS, x), L.pixelStorei(I.UNPACK_SKIP_ROWS, S), L.pixelStorei(I.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps && I.generateMipmap(v), L.unbindTexture();
		}, this.initRenderTarget = function(e) {
			R.get(e).__webglFramebuffer === void 0 && z.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? z.setTextureCube(e, 0) : e.isData3DTexture ? z.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? z.setTexture2DArray(e, 0) : z.setTexture2D(e, 0), L.unbindTexture();
		}, this.resetState = function() {
			ee = 0, te = 0, j = null, L.reset(), Be.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return Lc;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = X._getDrawingBufferColorSpace(e), t.unpackColorSpace = X._getUnpackColorSpace();
	}
}, Mg = { type: "change" }, Ng = { type: "start" }, Pg = { type: "end" }, Fg = new Ad(), Ig = new Xd(), Lg = Math.cos(70 * xl.DEG2RAD), Rg = new J(), zg = 2 * Math.PI, Bg = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, Vg = 1e-6, Hg = class extends pp {
	constructor(e, t = null) {
		super(e, t), this.state = Bg.NONE, this.target = new J(), this.cursor = new J(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: ss.ROTATE,
			MIDDLE: ss.DOLLY,
			RIGHT: ss.PAN
		}, this.touches = {
			ONE: cs.ROTATE,
			TWO: cs.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new J(), this._lastQuaternion = new Sl(), this._lastTargetPosition = new J(), this._quat = new Sl().setFromUnitVectors(e.up, new J(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new fp(), this._sphericalDelta = new fp(), this._scale = 1, this._panOffset = new J(), this._rotateStart = new q(), this._rotateEnd = new q(), this._rotateDelta = new q(), this._panStart = new q(), this._panEnd = new q(), this._panDelta = new q(), this._dollyStart = new q(), this._dollyEnd = new q(), this._dollyDelta = new q(), this._dollyDirection = new J(), this._mouse = new q(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Wg.bind(this), this._onPointerDown = Ug.bind(this), this._onPointerUp = Gg.bind(this), this._onContextMenu = Qg.bind(this), this._onMouseWheel = Jg.bind(this), this._onKeyDown = Yg.bind(this), this._onTouchStart = Xg.bind(this), this._onTouchMove = Zg.bind(this), this._onMouseDown = Kg.bind(this), this._onMouseMove = qg.bind(this), this._interceptControlDown = $g.bind(this), this._interceptControlUp = e_.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Mg), this.update(), this.state = Bg.NONE;
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
		let t = this.object.position;
		Rg.copy(t).sub(this.target), Rg.applyQuaternion(this._quat), this._spherical.setFromVector3(Rg), this.autoRotate && this.state === Bg.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += zg : n > Math.PI && (n -= zg), r < -Math.PI ? r += zg : r > Math.PI && (r -= zg), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (Rg.setFromSpherical(this._spherical), Rg.applyQuaternion(this._quatInverse), t.copy(this.target).add(Rg), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = Rg.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new J(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new J(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = Rg.length();
			} else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (Fg.origin.copy(this.object.position), Fg.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Fg.direction)) < Lg ? this.object.lookAt(this.target) : (Ig.setFromNormalAndCoplanarPoint(this.object.up, this.target), Fg.intersectPlane(Ig, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > Vg || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Vg || this._lastTargetPosition.distanceToSquared(this.target) > Vg ? (this.dispatchEvent(Mg), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? zg / 60 / 60 * this.autoRotateSpeed : zg / 60 * this.autoRotateSpeed * e;
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
		Rg.setFromMatrixColumn(t, 0), Rg.multiplyScalar(-e), this._panOffset.add(Rg);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? Rg.setFromMatrixColumn(t, 1) : (Rg.setFromMatrixColumn(t, 0), Rg.crossVectors(this.object.up, Rg)), Rg.multiplyScalar(e), this._panOffset.add(Rg);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			Rg.copy(r).sub(this.target);
			let i = Rg.length();
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
		this._rotateLeft(zg * this._rotateDelta.x / t.clientHeight), this._rotateUp(zg * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(zg * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-zg * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(zg * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-zg * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
		this._rotateLeft(zg * this._rotateDelta.x / t.clientHeight), this._rotateUp(zg * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
		t === void 0 && (t = new q(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function Ug(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function Wg(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Gg(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Pg), this.state = Bg.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
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
function Kg(e) {
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
		case ss.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = Bg.DOLLY;
			break;
		case ss.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = Bg.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = Bg.ROTATE;
			}
			break;
		case ss.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = Bg.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = Bg.PAN;
			}
			break;
		default: this.state = Bg.NONE;
	}
	this.state !== Bg.NONE && this.dispatchEvent(Ng);
}
function qg(e) {
	switch (this.state) {
		case Bg.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case Bg.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case Bg.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
			break;
	}
}
function Jg(e) {
	this.enabled === !1 || this.enableZoom === !1 || this.state !== Bg.NONE || (e.preventDefault(), this.dispatchEvent(Ng), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Pg));
}
function Yg(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function Xg(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case cs.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = Bg.TOUCH_ROTATE;
					break;
				case cs.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = Bg.TOUCH_PAN;
					break;
				default: this.state = Bg.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case cs.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = Bg.TOUCH_DOLLY_PAN;
					break;
				case cs.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = Bg.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = Bg.NONE;
			}
			break;
		default: this.state = Bg.NONE;
	}
	this.state !== Bg.NONE && this.dispatchEvent(Ng);
}
function Zg(e) {
	switch (this._trackPointer(e), this.state) {
		case Bg.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case Bg.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case Bg.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case Bg.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = Bg.NONE;
	}
}
function Qg(e) {
	this.enabled !== !1 && e.preventDefault();
}
function $g(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function e_(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/.pnpm/@lucide+vue@1.22.0_vue@3.5.39/node_modules/@lucide/vue/dist/esm/shared/src/utils/isEmptyString.mjs
var t_ = (e) => e === "", n_ = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), r_ = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), i_ = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), a_ = (e) => {
	let t = i_(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, o_ = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, s_ = /* @__PURE__ */ Symbol("lucide-icons");
function c_() {
	return Pn(s_, {});
}
//#endregion
//#region node_modules/.pnpm/@lucide+vue@1.22.0_vue@3.5.39/node_modules/@lucide/vue/dist/esm/Icon.mjs
var l_ = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o, color: s, ...c }, { slots: l }) => {
	let { size: u, color: d, strokeWidth: f = 2, absoluteStrokeWidth: p = !1, class: m = "" } = c_(), h = Va(() => {
		let e = t_(n) || t_(r) || n === !0 || r === !0 || p === !0, t = i || a || f || o_["stroke-width"];
		return e ? Number(t) * 24 / Number(o ?? u ?? o_.width) : t;
	});
	return Ha("svg", {
		...o_,
		...c,
		width: o ?? u ?? o_.width,
		height: o ?? u ?? o_.height,
		stroke: s ?? d ?? o_.stroke,
		"stroke-width": h.value,
		class: n_("lucide", m, ...e ? [`lucide-${r_(a_(e))}-icon`, `lucide-${r_(e)}`] : ["lucide-icon"])
	}, [...t.map((e) => Ha(...e)), ...l.default ? [l.default()] : []]);
}, u_ = (e, t) => (n, { slots: r, attrs: i }) => Ha(l_, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r.default ? { default: r.default } : void 0), d_ = u_("layers", [
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
]), f_ = u_("sparkles", [
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
]), p_ = u_("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), m_ = u_("copy", [["rect", {
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
}]]), h_ = u_("download", [
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
]), g_ = u_("hand", [
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
]), __ = u_("image", [
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
]), v_ = u_("info", [
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
]), y_ = u_("lightbulb", [
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
]), b_ = u_("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]), x_ = u_("map", [
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
]), S_ = u_("maximize", [
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
]), C_ = u_("minimize", [
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
]), w_ = u_("sun", [
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
]), T_ = class {
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
		}, this.nodes = [], this.buildTree();
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
				if (!n.isLeaf) for (let t = 0; t < 4; ++t) n.childrenIndices.push(e * 4 + 1 + (t + 2) % 4);
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
}, E_ = (e, t, n, r, i) => new gf({
	uniforms: {
		uLightDir: { value: t },
		tex0: { value: e[0] || null },
		tex1: { value: e[1] || null },
		tex2: { value: e[2] || null },
		tex3: { value: e[3] || null },
		uBias: { value: new zl(n[0] || 0, n[1] || 0, n[2] || 0, n[3] || 0) },
		uScale: { value: new zl(r[0] || 0, r[1] || 0, r[2] || 0, r[3] || 0) },
		uBounds: { value: i },
		uRenderMode: { value: 0 },
		uSpecularExponent: { value: 10 }
	},
	vertexShader: "\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n      void main() {\n        vUv = uv;\n        vec4 wPos = modelMatrix * vec4(position, 1.0);\n        vWorldPos = wPos.xy;\n        gl_Position = projectionMatrix * viewMatrix * wPos;\n      }\n    ",
	fragmentShader: "\n      uniform vec3 uLightDir;\n      uniform sampler2D tex0;\n      uniform sampler2D tex1;\n      uniform sampler2D tex2;\n      uniform sampler2D tex3;\n      uniform vec4 uBias;\n      uniform vec4 uScale;\n      uniform vec4 uBounds;\n      uniform int uRenderMode;\n      uniform float uSpecularExponent;\n\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n\n      void main() {\n        if (vWorldPos.x < uBounds.x || vWorldPos.x > uBounds.y || vWorldPos.y < uBounds.z || vWorldPos.y > uBounds.w) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n          return;\n        }\n\n        vec3 c0 = texture2D(tex0, vUv).xyz;\n        vec3 c1 = texture2D(tex1, vUv).xyz;\n        vec3 c2 = texture2D(tex2, vUv).xyz;\n        vec3 c3 = texture2D(tex3, vUv).xyz;\n\n        c0 = c0 * uBias.x + uScale.x;\n        c1 = c1 * uBias.y + uScale.y;\n        c2 = c2 * uBias.z + uScale.z;\n        c3 = c3 * uBias.w + uScale.w;\n\n        float cosTheta = uLightDir.z;\n        float cosTheta2 = cosTheta * cosTheta;\n        \n        float phi = 0.0;\n        if (abs(uLightDir.x) > 0.0001 || abs(uLightDir.y) > 0.0001) {\n          phi = atan(uLightDir.y, uLightDir.x);\n          if (phi < 0.0) phi += 2.0 * 3.14159265;\n        }\n        \n        float cosPhi = cos(phi);\n        float sinPhi = sin(phi);\n\n        float l0 = 1.0 / sqrt(2.0 * 3.14159265);\n        float l1 = sqrt(6.0 / 3.14159265) * (cosPhi * sqrt(max(0.0, cosTheta - cosTheta2)));\n        float l2 = sqrt(3.0 / (2.0 * 3.14159265)) * (-1.0 + 2.0 * cosTheta);\n        float l3 = sqrt(6.0 / 3.14159265) * (sqrt(max(0.0, cosTheta - cosTheta2)) * sinPhi);\n\n        vec3 color = c0 * l0 + c1 * l1 + c2 * l2 + c3 * l3;\n\n        if (uRenderMode == 0) {\n          gl_FragColor = vec4(color, 1.0);\n        } else if (uRenderMode == 1) {\n          float lum = dot(color, vec3(0.299, 0.587, 0.114));\n          float specular = pow(max(0.0, lum), uSpecularExponent);\n          gl_FragColor = vec4(color + vec3(specular * 0.8), 1.0);\n        } else if (uRenderMode == 2) {\n          // Calculate pseudo-normals from first-order HSH coefficients\n          float nx = dot(c1, vec3(0.299, 0.587, 0.114));\n          float ny = -dot(c3, vec3(0.299, 0.587, 0.114)); // Y is often flipped\n          float nz = dot(c2, vec3(0.299, 0.587, 0.114));\n          \n          vec3 N = normalize(vec3(nx, ny, abs(nz) + 0.1));\n          vec3 L = normalize(uLightDir);\n          \n          float diffuse = max(0.0, dot(N, L));\n          \n          vec3 normalColor = N * 0.5 + 0.5;\n          gl_FragColor = vec4(normalColor * (diffuse * 0.8 + 0.2), 1.0);\n        } else if (uRenderMode == 3) {\n          // Slope Heatmap\n          float nx = dot(c1, vec3(0.299, 0.587, 0.114));\n          float ny = -dot(c3, vec3(0.299, 0.587, 0.114));\n          float nz = dot(c2, vec3(0.299, 0.587, 0.114));\n          vec3 N = normalize(vec3(nx, ny, abs(nz) + 0.1));\n          \n          float steepness = 1.0 - N.z;\n          vec3 heat = mix(vec3(0.0, 0.0, 0.8), vec3(0.0, 0.8, 0.2), clamp(steepness * 3.0, 0.0, 1.0));\n          heat = mix(heat, vec3(1.0, 0.0, 0.0), clamp(steepness * 3.0 - 1.0, 0.0, 1.0));\n          gl_FragColor = vec4(heat, 1.0);\n        } else if (uRenderMode == 4) {\n          // Dual Light (Red/Blue Raking Light)\n          vec3 L2 = vec3(-uLightDir.x, -uLightDir.y, uLightDir.z);\n          float phi2 = 0.0;\n          if (abs(L2.x) > 0.0001 || abs(L2.y) > 0.0001) {\n            phi2 = atan(L2.y, L2.x);\n            if (phi2 < 0.0) phi2 += 2.0 * 3.14159265;\n          }\n          float l1_2 = sqrt(6.0 / 3.14159265) * (cos(phi2) * sqrt(max(0.0, cosTheta - cosTheta2)));\n          float l3_2 = sqrt(6.0 / 3.14159265) * (sqrt(max(0.0, cosTheta - cosTheta2)) * sin(phi2));\n          vec3 color2 = c0 * l0 + c1 * l1_2 + c2 * l2 + c3 * l3_2;\n\n          vec3 dualColor = (max(vec3(0.0), color) * vec3(1.0, 0.3, 0.1)) + (max(vec3(0.0), color2) * vec3(0.1, 0.5, 1.0));\n          gl_FragColor = vec4(dualColor, 1.0);\n        }\n      }\n    ",
	transparent: !0
}), D_ = (e, t, n, r, i) => {
	for (; n.length < 6;) n.push(0);
	for (; r.length < 6;) r.push(1);
	return new gf({
		uniforms: {
			uLightDir: { value: t },
			tex0: { value: e[0] || null },
			tex1: { value: e[1] || null },
			tex2: { value: e[2] || null },
			uBias: { value: new J(n[0], n[1], n[2]) },
			uBias2: { value: new J(n[3], n[4], n[5]) },
			uScale: { value: new J(r[0], r[1], r[2]) },
			uScale2: { value: new J(r[3], r[4], r[5]) },
			uBounds: { value: i },
			uRenderMode: { value: 0 },
			uSpecularExponent: { value: 10 }
		},
		vertexShader: "\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n      void main() {\n        vUv = uv;\n        vec4 wPos = modelMatrix * vec4(position, 1.0);\n        vWorldPos = wPos.xy;\n        gl_Position = projectionMatrix * viewMatrix * wPos;\n      }\n    ",
		fragmentShader: "\n      uniform vec3 uLightDir;\n      uniform sampler2D tex0;\n      uniform sampler2D tex1;\n      uniform sampler2D tex2;\n      \n      uniform vec3 uBias;\n      uniform vec3 uBias2;\n      uniform vec3 uScale;\n      uniform vec3 uScale2;\n      uniform vec4 uBounds;\n      uniform int uRenderMode;\n      uniform float uSpecularExponent;\n\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n\n      void main() {\n        if (vWorldPos.x < uBounds.x || vWorldPos.x > uBounds.y || vWorldPos.y < uBounds.z || vWorldPos.y > uBounds.w) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n          return;\n        }\n\n        vec3 coeffH = texture2D(tex0, vUv).xyz;\n        vec3 coeffL = texture2D(tex1, vUv).xyz;\n        vec3 color  = texture2D(tex2, vUv).xyz;\n\n        float u = uLightDir.x;\n        float v = uLightDir.y;\n\n        float l0 = u * u;\n        float l1 = v * v;\n        float l2 = u * v;\n        float l3 = u;\n        float l4 = v;\n        float l5 = 1.0;\n\n        float a0 = (coeffH.x - uBias.x / 255.0) * uScale.x;\n        float a1 = (coeffH.y - uBias.y / 255.0) * uScale.y;\n        float a2 = (coeffH.z - uBias.z / 255.0) * uScale.z;\n        float a3 = (coeffL.x - uBias2.x / 255.0) * uScale2.x;\n        float a4 = (coeffL.y - uBias2.y / 255.0) * uScale2.y;\n        float a5 = (coeffL.z - uBias2.z / 255.0) * uScale2.z;\n\n        float lum = a0*l0 + a1*l1 + a2*l2 + a3*l3 + a4*l4 + a5*l5;\n\n        if (uRenderMode == 0) {\n          // Default RTI\n          gl_FragColor = vec4(color * lum, 1.0);\n        } else if (uRenderMode == 1) {\n          // Specular Enhancement (Glossy)\n          float specular = pow(max(0.0, lum), uSpecularExponent);\n          gl_FragColor = vec4(color * lum + vec3(specular * 0.8), 1.0);\n        } else if (uRenderMode == 2) {\n          // Normals Mode (Shaded)\n          // Compute peak luminance direction (u0, v0) using derivatives\n          float den = 4.0 * a0 * a1 - a2 * a2;\n          float u0 = (a2 * a4 - 2.0 * a1 * a3) / (den + 0.000001);\n          float v0 = (a2 * a3 - 2.0 * a0 * a4) / (den + 0.000001);\n          \n          float r2 = u0*u0 + v0*v0;\n          if (r2 > 1.0) {\n            float len = sqrt(r2);\n            u0 /= len;\n            v0 /= len;\n            r2 = 1.0;\n          }\n          \n          vec3 N = normalize(vec3(u0, -v0, sqrt(max(0.0, 1.0 - r2))));\n          vec3 L = normalize(uLightDir);\n          \n          // Calculate pure structural lighting (Diffuse + Specular on the normal)\n          float diffuse = max(0.0, dot(N, L));\n          \n          // Wir geben die Normalen in RGB aus, aber beleuchten sie mit dem aktuellen Licht!\n          vec3 normalColor = N * 0.5 + 0.5;\n          gl_FragColor = vec4(normalColor * (diffuse * 0.8 + 0.2), 1.0);\n        } else if (uRenderMode == 3) {\n          // Slope Heatmap\n          float den = 4.0 * a0 * a1 - a2 * a2;\n          float u0 = (a2 * a4 - 2.0 * a1 * a3) / (den + 0.000001);\n          float v0 = (a2 * a3 - 2.0 * a0 * a4) / (den + 0.000001);\n          float r2 = u0*u0 + v0*v0;\n          if (r2 > 1.0) r2 = 1.0;\n          \n          float nz = sqrt(max(0.0, 1.0 - r2));\n          float steepness = 1.0 - nz;\n          \n          vec3 heat = mix(vec3(0.0, 0.0, 0.8), vec3(0.0, 0.8, 0.2), clamp(steepness * 3.0, 0.0, 1.0));\n          heat = mix(heat, vec3(1.0, 0.0, 0.0), clamp(steepness * 3.0 - 1.0, 0.0, 1.0));\n          gl_FragColor = vec4(heat, 1.0);\n        } else if (uRenderMode == 4) {\n          // Dual Light (Red/Blue Raking Light)\n          float u2 = -uLightDir.x;\n          float v2 = -uLightDir.y;\n          float lum2 = a0*(u2*u2) + a1*(v2*v2) + a2*(u2*v2) + a3*u2 + a4*v2 + a5;\n          \n          vec3 dualColor = color * (vec3(1.0, 0.3, 0.1) * max(0.0, lum) + vec3(0.1, 0.5, 1.0) * max(0.0, lum2));\n          gl_FragColor = vec4(dualColor, 1.0);\n        }\n      }\n    ",
		transparent: !0
	});
}, O_ = (e, t, n, r) => {
	let i = [];
	for (let e = 0; e < 16; e++) for (let t = 0; t < 7; t++) i.push(n.w1[e][t]);
	let a = n.b1, o = [];
	for (let e = 0; e < 16; e++) for (let t = 0; t < 16; t++) o.push(n.w2[e][t]);
	let s = n.b2, c = [];
	for (let e = 0; e < 3; e++) for (let t = 0; t < 16; t++) c.push(n.w3[e][t]);
	let l = n.b3;
	return new gf({
		uniforms: {
			uLightDir: { value: t },
			tex0: { value: e[0] || null },
			uBounds: { value: r },
			uW1: { value: new Float32Array(i) },
			uB1: { value: new Float32Array(a) },
			uW2: { value: new Float32Array(o) },
			uB2: { value: new Float32Array(s) },
			uW3: { value: new Float32Array(c) },
			uB3: { value: new Float32Array(l) },
			uRenderMode: { value: 0 },
			uSpecularExponent: { value: 10 }
		},
		vertexShader: "\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n      void main() {\n        vUv = uv;\n        vec4 wPos = modelMatrix * vec4(position, 1.0);\n        vWorldPos = wPos.xy;\n        gl_Position = projectionMatrix * viewMatrix * wPos;\n      }\n    ",
		fragmentShader: "\n      uniform vec3 uLightDir;\n      uniform sampler2D tex0;\n      uniform vec4 uBounds;\n      uniform int uRenderMode;\n      uniform float uSpecularExponent;\n      \n      uniform float uW1[112];\n      uniform float uB1[16];\n      uniform float uW2[256];\n      uniform float uB2[16];\n      uniform float uW3[48];\n      uniform float uB3[3];\n\n      varying vec2 vUv;\n      varying vec2 vWorldPos;\n\n      vec3 evaluateMLP(vec3 lDir, vec4 latent) {\n        float x[7];\n        x[0] = latent.r;\n        x[1] = latent.g;\n        x[2] = latent.b;\n        x[3] = latent.a;\n        x[4] = lDir.x;\n        x[5] = lDir.y;\n        x[6] = lDir.z;\n\n        // Layer 1\n        float h1[16];\n        for (int i = 0; i < 16; i++) {\n          float val = uB1[i];\n          for (int j = 0; j < 7; j++) {\n            val += uW1[i * 7 + j] * x[j];\n          }\n          h1[i] = max(0.0, val);\n        }\n\n        // Layer 2\n        float h2[16];\n        for (int i = 0; i < 16; i++) {\n          float val = uB2[i];\n          for (int j = 0; j < 16; j++) {\n            val += uW2[i * 16 + j] * h1[j];\n          }\n          h2[i] = max(0.0, val);\n        }\n\n        // Layer 3\n        float rgb[3];\n        for (int i = 0; i < 3; i++) {\n          float val = uB3[i];\n          for (int j = 0; j < 16; j++) {\n            val += uW3[i * 16 + j] * h2[j];\n          }\n          rgb[i] = 1.0 / (1.0 + exp(-val));\n        }\n\n        return vec3(rgb[0], rgb[1], rgb[2]);\n      }\n\n      void main() {\n        if (vWorldPos.x < uBounds.x || vWorldPos.x > uBounds.y || vWorldPos.y < uBounds.z || vWorldPos.y > uBounds.w) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n          return;\n        }\n\n        vec4 latent = texture2D(tex0, vUv);\n        vec3 color = evaluateMLP(uLightDir, latent);\n\n        if (uRenderMode == 0) {\n          gl_FragColor = vec4(color, 1.0);\n        } else if (uRenderMode == 5) {\n          // Latent Map Mode\n          gl_FragColor = vec4(latent.rgb, 1.0);\n        } else {\n          // Estimate normal N using finite differences at normal incidence (0, 0, 1)\n          float eps = 0.005;\n          float z_eps = sqrt(1.0 - eps * eps);\n          \n          vec3 c0 = evaluateMLP(vec3(0.0, 0.0, 1.0), latent);\n          vec3 cx = evaluateMLP(vec3(eps, 0.0, z_eps), latent);\n          vec3 cy = evaluateMLP(vec3(0.0, eps, z_eps), latent);\n          \n          float y0 = dot(c0, vec3(0.299, 0.587, 0.114));\n          float yx = dot(cx, vec3(0.299, 0.587, 0.114));\n          float yy = dot(cy, vec3(0.299, 0.587, 0.114));\n          \n          float gx = (yx - y0) / eps;\n          float gy = (yy - y0) / eps;\n          \n          // Pseudo-normal (flip gradients to match standard surface normal, scale by 4.0 for depth)\n          vec3 N = normalize(vec3(-gx * 4.0, -gy * 4.0, 1.0));\n\n          if (uRenderMode == 1) {\n            // Glossy Mode (Blinn-Phong Specular Enhancement)\n            vec3 L = normalize(uLightDir);\n            vec3 V = vec3(0.0, 0.0, 1.0);\n            vec3 H = normalize(L + V);\n            float specular = pow(max(0.0, dot(N, H)), uSpecularExponent);\n            gl_FragColor = vec4(color + vec3(specular * 0.8), 1.0);\n          } else if (uRenderMode == 2) {\n            // Normals Mode\n            vec3 normalColor = N * 0.5 + 0.5;\n            float diffuse = max(0.0, dot(N, normalize(uLightDir)));\n            gl_FragColor = vec4(normalColor * (diffuse * 0.8 + 0.2), 1.0);\n          } else if (uRenderMode == 3) {\n            // Slope Heatmap\n            float steepness = 1.0 - N.z;\n            vec3 heat = mix(vec3(0.0, 0.0, 0.8), vec3(0.0, 0.8, 0.2), clamp(steepness * 3.0, 0.0, 1.0));\n            heat = mix(heat, vec3(1.0, 0.0, 0.0), clamp(steepness * 3.0 - 1.0, 0.0, 1.0));\n            gl_FragColor = vec4(heat, 1.0);\n          } else if (uRenderMode == 4) {\n            // Dual Light\n            vec3 color2 = evaluateMLP(vec3(-uLightDir.x, -uLightDir.y, uLightDir.z), latent);\n            vec3 dualColor = (max(vec3(0.0), color) * vec3(1.0, 0.3, 0.1)) + (max(vec3(0.0), color2) * vec3(0.1, 0.5, 1.0));\n            gl_FragColor = vec4(dualColor, 1.0);\n          }\n        }\n      }\n    ",
		transparent: !0
	});
};
//#endregion
//#region node_modules/.pnpm/@petamoriken+float16@3.9.3/node_modules/@petamoriken/float16/src/_util/primordials.mjs
function k_(e) {
	return (t, ...n) => j_(e, t, n);
}
function A_(e, t) {
	return k_(F_(e, t).get);
}
var { apply: j_, construct: M_, defineProperty: N_, get: P_, getOwnPropertyDescriptor: F_, getPrototypeOf: I_, has: L_, ownKeys: R_, set: z_, setPrototypeOf: B_ } = Reflect, { EPSILON: V_, MAX_SAFE_INTEGER: H_, isFinite: U_, isNaN: W_ } = Number, { iterator: G_, species: K_, toStringTag: q_, for: J_ } = Symbol, Y_ = Object, { create: X_, defineProperty: Z_, freeze: Q_, is: $_ } = Y_, ev = Y_.prototype;
ev.__lookupGetter__ && ev.__lookupGetter__, Y_.hasOwn || ev.hasOwnProperty;
var tv = Array;
tv.isArray;
var nv = tv.prototype;
nv.join, nv.push, nv.toLocaleString;
var rv = nv[G_], iv = k_(rv), { abs: av, trunc: ov } = Math, sv = ArrayBuffer;
sv.isView;
var cv = sv.prototype;
cv.slice, A_(cv, "byteLength");
var lv = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null;
lv && A_(lv.prototype, "byteLength");
var uv = I_(Uint8Array);
uv.from;
var dv = uv.prototype;
dv[G_], dv.keys, dv.values, dv.entries, dv.set, dv.reverse, dv.fill, dv.copyWithin, dv.sort, dv.slice, dv.subarray, A_(dv, "buffer"), A_(dv, "byteOffset"), A_(dv, "length"), A_(dv, q_);
var fv = Uint8Array, pv = Uint16Array, mv = Uint32Array, hv = Float32Array, gv = I_([][G_]()), _v = k_(gv.next), vv = k_((function* () {})().next), yv = I_(gv), bv = DataView.prototype, xv = k_(bv.getUint16);
bv.setUint16;
var Sv = WeakSet.prototype;
Sv.add, Sv.has;
var Cv = WeakMap, wv = Cv.prototype, Tv = k_(wv.get);
wv.has;
var Ev = k_(wv.set), Dv = new Cv(), Ov = X_(null, {
	next: { value: function() {
		return _v(Tv(Dv, this));
	} },
	[G_]: { value: function() {
		return this;
	} }
});
function kv(e) {
	if (e[G_] === rv && gv.next === _v) return e;
	let t = X_(Ov);
	return Ev(Dv, t, iv(e)), t;
}
var Av = new Cv(), jv = X_(yv, { next: {
	value: function() {
		return vv(Tv(Av, this));
	},
	writable: !0,
	configurable: !0
} });
for (let e of R_(gv)) e !== "next" && Z_(jv, e, F_(gv, e));
//#endregion
//#region node_modules/.pnpm/@petamoriken+float16@3.9.3/node_modules/@petamoriken/float16/src/_util/converter.mjs
var Mv = 1 / V_, Nv = 6103515625e-14, Pv = .0009765625;
Pv * Nv, Pv * Mv;
var Fv = new sv(4), Iv = new hv(Fv), Lv = new mv(Fv), Rv = new pv(512), zv = new fv(512);
for (let e = 0; e < 256; ++e) {
	let t = e - 127;
	t < -24 ? (Rv[e] = 0, Rv[e | 256] = 32768, zv[e] = 24, zv[e | 256] = 24) : t < -14 ? (Rv[e] = 1024 >> -t - 14, Rv[e | 256] = 1024 >> -t - 14 | 32768, zv[e] = -t - 1, zv[e | 256] = -t - 1) : t <= 15 ? (Rv[e] = t + 15 << 10, Rv[e | 256] = t + 15 << 10 | 32768, zv[e] = 13, zv[e | 256] = 13) : t < 128 ? (Rv[e] = 31744, Rv[e | 256] = 64512, zv[e] = 24, zv[e | 256] = 24) : (Rv[e] = 31744, Rv[e | 256] = 64512, zv[e] = 13, zv[e | 256] = 13);
}
var Bv = new mv(2048);
for (let e = 1; e < 1024; ++e) {
	let t = e << 13, n = 0;
	for (; !(t & 8388608);) t <<= 1, n -= 8388608;
	t &= -8388609, n += 947912704, Bv[e] = t | n;
}
for (let e = 1024; e < 2048; ++e) Bv[e] = 939524096 + (e - 1024 << 13);
var Vv = new mv(64);
for (let e = 1; e < 31; ++e) Vv[e] = e << 23;
Vv[31] = 1199570944, Vv[32] = 2147483648;
for (let e = 33; e < 63; ++e) Vv[e] = 2147483648 + (e - 32 << 23);
Vv[63] = 3347054592;
var Hv = new pv(64);
for (let e = 1; e < 64; ++e) e !== 32 && (Hv[e] = 1024);
function Uv(e) {
	let t = e >> 10;
	return Lv[0] = Bv[Hv[t] + (e & 1023)] + Vv[t], Iv[0];
}
//#endregion
//#region node_modules/.pnpm/@petamoriken+float16@3.9.3/node_modules/@petamoriken/float16/src/DataView.mjs
function Wv(e, t, ...n) {
	return Uv(xv(e, t, ...kv(n)));
}
//#endregion
//#region node_modules/.pnpm/xml-utils@1.10.2/node_modules/xml-utils/get-attribute.js
var Gv = /* @__PURE__ */ r(((e, t) => {
	function n(e, t, n) {
		let r = n && n.debug || !1;
		r && console.log("[xml-utils] getting " + t + " in " + e);
		let i = typeof e == "object" ? e.outer : e, a = i.slice(0, i.indexOf(">") + 1), o = ["\"", "'"];
		for (let e = 0; e < o.length; e++) {
			let n = o[e], i = t + "\\=" + n + "([^" + n + "]*)" + n;
			r && console.log("[xml-utils] pattern:", i);
			let s = new RegExp(i).exec(a);
			if (r && console.log("[xml-utils] match:", s), s) return s[1];
		}
	}
	t.exports = n, t.exports.default = n;
})), Kv = /* @__PURE__ */ r(((e, t) => {
	function n(e, t, n) {
		let r = new RegExp(t).exec(e.slice(n));
		return r ? n + r.index : -1;
	}
	t.exports = n, t.exports.default = n;
})), qv = /* @__PURE__ */ r(((e, t) => {
	function n(e, t, n) {
		let r = new RegExp(t).exec(e.slice(n));
		return r ? n + r.index + r[0].length - 1 : -1;
	}
	t.exports = n, t.exports.default = n;
})), Jv = /* @__PURE__ */ r(((e, t) => {
	function n(e, t) {
		let n = new RegExp(t, "g"), r = e.match(n);
		return r ? r.length : 0;
	}
	t.exports = n, t.exports.default = n;
})), Yv = /* @__PURE__ */ r(((e, t) => {
	var n = Kv(), r = qv(), i = Jv();
	function a(e, t, a) {
		let o = a && a.debug || !1, s = a && a.startIndex || 0;
		o && console.log("[xml-utils] starting findTagByName with", t, " and ", a);
		let c = n(e, `\<${t}[ \n\>\/]`, s);
		if (o && console.log("[xml-utils] start:", c), c === -1) return;
		let l = e.slice(c + t.length), u = r(l, "^[^<]*[ /]>", 0), d = u !== -1 && l[u - 1] === "/";
		if (o && console.log("[xml-utils] selfClosing:", d), d === !1) {
			let e = 0, n = 1, a = 0;
			for (; (u = r(l, "[ /]" + t + ">", e)) !== -1;) {
				let r = l.substring(e, u + 1);
				if (n += i(r, "<" + t + "[ \n	>]"), a += i(r, "</" + t + ">"), a >= n) break;
				e = u;
			}
		}
		let f = c + t.length + u + 1;
		if (o && console.log("[xml-utils] end:", f), f === -1) return;
		let p = e.slice(c, f), m;
		return m = d ? null : p.slice(p.indexOf(">") + 1, p.lastIndexOf("<")), {
			inner: m,
			outer: p,
			start: c,
			end: f
		};
	}
	t.exports = a, t.exports.default = a;
})), Xv = /* @__PURE__ */ r(((e, t) => {
	var n = Yv();
	function r(e, t, r) {
		let i = [], a = r && r.debug || !1, o = r && typeof r.nested == "boolean" ? r.nested : !0, s = r && r.startIndex || 0, c;
		for (; c = n(e, t, {
			debug: a,
			startIndex: s
		});) s = o ? c.start + 1 + t.length : c.end, i.push(c);
		return a && console.log("findTagsByName found", i.length, "tags"), i;
	}
	t.exports = r, t.exports.default = r;
})), Zv = /* @__PURE__ */ s(Gv(), 1), Qv = /* @__PURE__ */ s(Xv(), 1);
function $v(e, t) {
	let { width: n, height: r } = e, i = new Uint8Array(n * r * 3), a;
	for (let n = 0, r = 0; n < e.length; ++n, r += 3) a = 256 - e[n] / t * 256, i[r] = a, i[r + 1] = a, i[r + 2] = a;
	return i;
}
function ey(e, t) {
	let { width: n, height: r } = e, i = new Uint8Array(n * r * 3), a;
	for (let n = 0, r = 0; n < e.length; ++n, r += 3) a = e[n] / t * 256, i[r] = a, i[r + 1] = a, i[r + 2] = a;
	return i;
}
function ty(e, t) {
	let { width: n, height: r } = e, i = new Uint8Array(n * r * 3), a = t.length / 3, o = t.length / 3 * 2;
	for (let n = 0, r = 0; n < e.length; ++n, r += 3) {
		let s = e[n];
		i[r] = t[s] / 65536 * 256, i[r + 1] = t[s + a] / 65536 * 256, i[r + 2] = t[s + o] / 65536 * 256;
	}
	return i;
}
function ny(e) {
	let { width: t, height: n } = e, r = new Uint8Array(t * n * 3);
	for (let t = 0, n = 0; t < e.length; t += 4, n += 3) {
		let i = e[t], a = e[t + 1], o = e[t + 2], s = e[t + 3];
		r[n] = 255 * ((255 - i) / 256) * ((255 - s) / 256), r[n + 1] = 255 * ((255 - a) / 256) * ((255 - s) / 256), r[n + 2] = 255 * ((255 - o) / 256) * ((255 - s) / 256);
	}
	return r;
}
function ry(e) {
	let { width: t, height: n } = e, r = new Uint8ClampedArray(t * n * 3);
	for (let t = 0, n = 0; t < e.length; t += 3, n += 3) {
		let i = e[t], a = e[t + 1], o = e[t + 2];
		r[n] = i + 1.402 * (o - 128), r[n + 1] = i - .34414 * (a - 128) - .71414 * (o - 128), r[n + 2] = i + 1.772 * (a - 128);
	}
	return r;
}
var iy = .95047, ay = 1, oy = 1.08883;
function sy(e) {
	let { width: t, height: n } = e, r = new Uint8Array(t * n * 3);
	for (let t = 0, n = 0; t < e.length; t += 3, n += 3) {
		let i = e[t + 0], a = e[t + 1] << 24 >> 24, o = e[t + 2] << 24 >> 24, s = (i + 16) / 116, c = a / 500 + s, l = s - o / 200, u, d, f;
		c = iy * (c * c * c > .008856 ? c * c * c : (c - 16 / 116) / 7.787), s = ay * (s * s * s > .008856 ? s * s * s : (s - 16 / 116) / 7.787), l = oy * (l * l * l > .008856 ? l * l * l : (l - 16 / 116) / 7.787), u = c * 3.2406 + s * -1.5372 + l * -.4986, d = c * -.9689 + s * 1.8758 + l * .0415, f = c * .0557 + s * -.204 + l * 1.057, u = u > .0031308 ? 1.055 * u ** (1 / 2.4) - .055 : 12.92 * u, d = d > .0031308 ? 1.055 * d ** (1 / 2.4) - .055 : 12.92 * d, f = f > .0031308 ? 1.055 * f ** (1 / 2.4) - .055 : 12.92 * f, r[n] = Math.max(0, Math.min(1, u)) * 255, r[n + 1] = Math.max(0, Math.min(1, d)) * 255, r[n + 2] = Math.max(0, Math.min(1, f)) * 255;
	}
	return r;
}
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/compression/index.js
var cy = /* @__PURE__ */ new Map();
function ly(e, t) {
	Array.isArray(e) || (e = [e]), e.forEach((e) => cy.set(e, t));
}
async function uy(e) {
	let t = cy.get(e.Compression);
	if (!t) throw Error(`Unknown compression method identifier: ${e.Compression}`);
	return new (await (t()))(e);
}
ly([void 0, 1], () => import("./raw-CyrI7g6i.js").then((e) => e.default)), ly(5, () => import("./lzw-CL6_jkFh.js").then((e) => e.default)), ly(6, () => {
	throw Error("old style JPEG compression is not supported.");
}), ly(7, () => import("./jpeg-CsO94HRR.js").then((e) => e.default)), ly([8, 32946], () => import("./deflate-B2jCq5mN.js").then((e) => e.default)), ly(32773, () => import("./packbits-BWl9-Ers.js").then((e) => e.default)), ly(34887, () => import("./lerc-pg6KC_4J.js").then(async (e) => (await e.zstd.init(), e)).then((e) => e.default)), ly(50001, () => import("./webimage-HNziE50I.js").then((e) => e.default));
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/resample.js
function dy(e, t, n, r = 1) {
	return new (Object.getPrototypeOf(e)).constructor(t * n * r);
}
function fy(e, t, n, r, i) {
	let a = t / r, o = n / i;
	return e.map((e) => {
		let s = dy(e, r, i);
		for (let c = 0; c < i; ++c) {
			let i = Math.min(Math.round(o * c), n - 1);
			for (let n = 0; n < r; ++n) {
				let o = Math.min(Math.round(a * n), t - 1), l = e[i * t + o];
				s[c * r + n] = l;
			}
		}
		return s;
	});
}
function py(e, t, n) {
	return (1 - n) * e + n * t;
}
function my(e, t, n, r, i) {
	let a = t / r, o = n / i;
	return e.map((e) => {
		let s = dy(e, r, i);
		for (let c = 0; c < i; ++c) {
			let i = o * c, l = Math.floor(i), u = Math.min(Math.ceil(i), n - 1);
			for (let n = 0; n < r; ++n) {
				let o = a * n, d = o % 1, f = Math.floor(o), p = Math.min(Math.ceil(o), t - 1), m = e[l * t + f], h = e[l * t + p], g = e[u * t + f], _ = e[u * t + p], v = py(py(m, h, d), py(g, _, d), i % 1);
				s[c * r + n] = v;
			}
		}
		return s;
	});
}
function hy(e, t, n, r, i, a = "nearest") {
	switch (a.toLowerCase()) {
		case "nearest": return fy(e, t, n, r, i);
		case "bilinear":
		case "linear": return my(e, t, n, r, i);
		default: throw Error(`Unsupported resampling method: '${a}'`);
	}
}
function gy(e, t, n, r, i, a) {
	let o = t / r, s = n / i, c = dy(e, r, i, a);
	for (let l = 0; l < i; ++l) {
		let i = Math.min(Math.round(s * l), n - 1);
		for (let n = 0; n < r; ++n) {
			let s = Math.min(Math.round(o * n), t - 1);
			for (let o = 0; o < a; ++o) {
				let u = e[i * t * a + s * a + o];
				c[l * r * a + n * a + o] = u;
			}
		}
	}
	return c;
}
function _y(e, t, n, r, i, a) {
	let o = t / r, s = n / i, c = dy(e, r, i, a);
	for (let l = 0; l < i; ++l) {
		let i = s * l, u = Math.floor(i), d = Math.min(Math.ceil(i), n - 1);
		for (let n = 0; n < r; ++n) {
			let s = o * n, f = s % 1, p = Math.floor(s), m = Math.min(Math.ceil(s), t - 1);
			for (let o = 0; o < a; ++o) {
				let s = e[u * t * a + p * a + o], h = e[u * t * a + m * a + o], g = e[d * t * a + p * a + o], _ = e[d * t * a + m * a + o], v = py(py(s, h, f), py(g, _, f), i % 1);
				c[l * r * a + n * a + o] = v;
			}
		}
	}
	return c;
}
function vy(e, t, n, r, i, a, o = "nearest") {
	switch (o.toLowerCase()) {
		case "nearest": return gy(e, t, n, r, i, a);
		case "bilinear":
		case "linear": return _y(e, t, n, r, i, a);
		default: throw Error(`Unsupported resampling method: '${o}'`);
	}
}
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/geotiffimage.js
function yy(e, t, n) {
	let r = 0;
	for (let i = t; i < n; ++i) r += e[i];
	return r;
}
function by(e, t, n) {
	switch (e) {
		case 1:
			if (t <= 8) return new Uint8Array(n);
			if (t <= 16) return new Uint16Array(n);
			if (t <= 32) return new Uint32Array(n);
			break;
		case 2:
			if (t === 8) return new Int8Array(n);
			if (t === 16) return new Int16Array(n);
			if (t === 32) return new Int32Array(n);
			break;
		case 3:
			switch (t) {
				case 16:
				case 32: return new Float32Array(n);
				case 64: return new Float64Array(n);
				default: break;
			}
			break;
		default: break;
	}
	throw Error("Unsupported data format/bitsPerSample");
}
function xy(e, t) {
	return (e === 1 || e === 2) && t <= 32 && t % 8 == 0 ? !1 : !(e === 3 && (t === 16 || t === 32 || t === 64));
}
function Sy(e, t, n, r, i, a, o) {
	let s = new DataView(e), c = n === 2 ? o * a : o * a * r, l = n === 2 ? 1 : r, u = by(t, i, c), d = parseInt("1".repeat(i), 2);
	if (t === 1) {
		let e;
		e = n === 1 ? r * i : i;
		let t = a * e;
		t & 7 && (t = t + 7 & -8);
		for (let e = 0; e < o; ++e) {
			let n = e * t;
			for (let t = 0; t < a; ++t) {
				let r = n + t * l * i;
				for (let n = 0; n < l; ++n) {
					let o = r + n * i, c = (e * a + t) * l + n, f = Math.floor(o / 8), p = o % 8;
					p + i <= 8 ? u[c] = s.getUint8(f) >> 8 - i - p & d : p + i <= 16 ? u[c] = s.getUint16(f) >> 16 - i - p & d : p + i <= 24 ? u[c] = (s.getUint16(f) << 8 | s.getUint8(f + 2)) >> 24 - i - p & d : u[c] = s.getUint32(f) >> 32 - i - p & d;
				}
			}
		}
	}
	return u.buffer;
}
var Cy = class {
	constructor(e, t, n, r, i, a) {
		this.fileDirectory = e, this.geoKeys = t, this.dataView = n, this.littleEndian = r, this.tiles = i ? {} : null, this.isTiled = !e.StripOffsets;
		let o = e.PlanarConfiguration;
		if (this.planarConfiguration = o === void 0 ? 1 : o, this.planarConfiguration !== 1 && this.planarConfiguration !== 2) throw Error("Invalid planar configuration.");
		this.source = a;
	}
	getFileDirectory() {
		return this.fileDirectory;
	}
	getGeoKeys() {
		return this.geoKeys;
	}
	getWidth() {
		return this.fileDirectory.ImageWidth;
	}
	getHeight() {
		return this.fileDirectory.ImageLength;
	}
	getSamplesPerPixel() {
		return this.fileDirectory.SamplesPerPixel === void 0 ? 1 : this.fileDirectory.SamplesPerPixel;
	}
	getTileWidth() {
		return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
	}
	getTileHeight() {
		return this.isTiled ? this.fileDirectory.TileLength : this.fileDirectory.RowsPerStrip === void 0 ? this.getHeight() : Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
	}
	getBlockWidth() {
		return this.getTileWidth();
	}
	getBlockHeight(e) {
		return this.isTiled || (e + 1) * this.getTileHeight() <= this.getHeight() ? this.getTileHeight() : this.getHeight() - e * this.getTileHeight();
	}
	getBytesPerPixel() {
		let e = 0;
		for (let t = 0; t < this.fileDirectory.BitsPerSample.length; ++t) e += this.getSampleByteSize(t);
		return e;
	}
	getSampleByteSize(e) {
		if (e >= this.fileDirectory.BitsPerSample.length) throw RangeError(`Sample index ${e} is out of range.`);
		return Math.ceil(this.fileDirectory.BitsPerSample[e] / 8);
	}
	getReaderForSample(e) {
		let t = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1, n = this.fileDirectory.BitsPerSample[e];
		switch (t) {
			case 1:
				if (n <= 8) return DataView.prototype.getUint8;
				if (n <= 16) return DataView.prototype.getUint16;
				if (n <= 32) return DataView.prototype.getUint32;
				break;
			case 2:
				if (n <= 8) return DataView.prototype.getInt8;
				if (n <= 16) return DataView.prototype.getInt16;
				if (n <= 32) return DataView.prototype.getInt32;
				break;
			case 3:
				switch (n) {
					case 16: return function(e, t) {
						return Wv(this, e, t);
					};
					case 32: return DataView.prototype.getFloat32;
					case 64: return DataView.prototype.getFloat64;
					default: break;
				}
				break;
			default: break;
		}
		throw Error("Unsupported data format/bitsPerSample");
	}
	getSampleFormat(e = 0) {
		return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1;
	}
	getBitsPerSample(e = 0) {
		return this.fileDirectory.BitsPerSample[e];
	}
	getArrayForSample(e, t) {
		return by(this.getSampleFormat(e), this.getBitsPerSample(e), t);
	}
	async getTileOrStrip(e, t, n, r, i) {
		let a = Math.ceil(this.getWidth() / this.getTileWidth()), o = Math.ceil(this.getHeight() / this.getTileHeight()), s, { tiles: c } = this;
		this.planarConfiguration === 1 ? s = t * a + e : this.planarConfiguration === 2 && (s = n * a * o + t * a + e);
		let l, u;
		this.isTiled ? (l = this.fileDirectory.TileOffsets[s], u = this.fileDirectory.TileByteCounts[s]) : (l = this.fileDirectory.StripOffsets[s], u = this.fileDirectory.StripByteCounts[s]);
		let d = (await this.source.fetch([{
			offset: l,
			length: u
		}], i))[0], f;
		return c === null || !c[s] ? (f = (async () => {
			let e = await r.decode(this.fileDirectory, d), n = this.getSampleFormat(), i = this.getBitsPerSample();
			return xy(n, i) && (e = Sy(e, n, this.planarConfiguration, this.getSamplesPerPixel(), i, this.getTileWidth(), this.getBlockHeight(t))), e;
		})(), c !== null && (c[s] = f)) : f = c[s], {
			x: e,
			y: t,
			sample: n,
			data: await f
		};
	}
	async _readRaster(e, t, n, r, i, a, o, s, c) {
		let l = this.getTileWidth(), u = this.getTileHeight(), d = this.getWidth(), f = this.getHeight(), p = Math.max(Math.floor(e[0] / l), 0), m = Math.min(Math.ceil(e[2] / l), Math.ceil(d / l)), h = Math.max(Math.floor(e[1] / u), 0), g = Math.min(Math.ceil(e[3] / u), Math.ceil(f / u)), _ = e[2] - e[0], v = this.getBytesPerPixel(), y = [], b = [];
		for (let e = 0; e < t.length; ++e) this.planarConfiguration === 1 ? y.push(yy(this.fileDirectory.BitsPerSample, 0, t[e]) / 8) : y.push(0), b.push(this.getReaderForSample(t[e]));
		let x = [], { littleEndian: S } = this;
		for (let a = h; a < g; ++a) for (let o = p; o < m; ++o) {
			let s;
			this.planarConfiguration === 1 && (s = this.getTileOrStrip(o, a, 0, i, c));
			for (let p = 0; p < t.length; ++p) {
				let m = p, h = t[p];
				this.planarConfiguration === 2 && (v = this.getSampleByteSize(h), s = this.getTileOrStrip(o, a, h, i, c));
				let g = s.then((i) => {
					let a = i.data, o = new DataView(a), s = this.getBlockHeight(i.y), c = i.y * u, p = i.x * l, h = c + s, g = (i.x + 1) * l, x = b[m], C = Math.min(s, s - (h - e[3]), f - c), w = Math.min(l, l - (g - e[2]), d - p);
					for (let i = Math.max(0, e[1] - c); i < C; ++i) for (let a = Math.max(0, e[0] - p); a < w; ++a) {
						let s = (i * l + a) * v, u = x.call(o, s + y[m], S), d;
						r ? (d = (i + c - e[1]) * _ * t.length + (a + p - e[0]) * t.length + m, n[d] = u) : (d = (i + c - e[1]) * _ + a + p - e[0], n[m][d] = u);
					}
				});
				x.push(g);
			}
		}
		if (await Promise.all(x), a && e[2] - e[0] !== a || o && e[3] - e[1] !== o) {
			let i;
			return i = r ? vy(n, e[2] - e[0], e[3] - e[1], a, o, t.length, s) : hy(n, e[2] - e[0], e[3] - e[1], a, o, s), i.width = a, i.height = o, i;
		}
		return n.width = a || e[2] - e[0], n.height = o || e[3] - e[1], n;
	}
	async readRasters({ window: e, samples: t = [], interleave: n, pool: r = null, width: i, height: a, resampleMethod: o, fillValue: s, signal: c } = {}) {
		let l = e || [
			0,
			0,
			this.getWidth(),
			this.getHeight()
		];
		if (l[0] > l[2] || l[1] > l[3]) throw Error("Invalid subsets");
		let u = (l[2] - l[0]) * (l[3] - l[1]), d = this.getSamplesPerPixel();
		if (!t || !t.length) for (let e = 0; e < d; ++e) t.push(e);
		else for (let e = 0; e < t.length; ++e) if (t[e] >= d) return Promise.reject(/* @__PURE__ */ RangeError(`Invalid sample index '${t[e]}'.`));
		let f;
		if (n) f = by(this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, Math.max.apply(null, this.fileDirectory.BitsPerSample), u * t.length), s && f.fill(s);
		else {
			f = [];
			for (let e = 0; e < t.length; ++e) {
				let n = this.getArrayForSample(t[e], u);
				Array.isArray(s) && e < s.length ? n.fill(s[e]) : s && !Array.isArray(s) && n.fill(s), f.push(n);
			}
		}
		let p = r || await uy(this.fileDirectory);
		return await this._readRaster(l, t, f, n, p, i, a, o, c);
	}
	async readRGB({ window: e, interleave: n = !0, pool: r = null, width: i, height: a, resampleMethod: s, enableAlpha: c = !1, signal: l } = {}) {
		let u = e || [
			0,
			0,
			this.getWidth(),
			this.getHeight()
		];
		if (u[0] > u[2] || u[1] > u[3]) throw Error("Invalid subsets");
		let d = this.fileDirectory.PhotometricInterpretation;
		if (d === t.RGB) {
			let t = [
				0,
				1,
				2
			];
			if (this.fileDirectory.ExtraSamples !== o.Unspecified && c) {
				t = [];
				for (let e = 0; e < this.fileDirectory.BitsPerSample.length; e += 1) t.push(e);
			}
			return this.readRasters({
				window: e,
				interleave: n,
				samples: t,
				pool: r,
				width: i,
				height: a,
				resampleMethod: s,
				signal: l
			});
		}
		let f;
		switch (d) {
			case t.WhiteIsZero:
			case t.BlackIsZero:
			case t.Palette:
				f = [0];
				break;
			case t.CMYK:
				f = [
					0,
					1,
					2,
					3
				];
				break;
			case t.YCbCr:
			case t.CIELab:
				f = [
					0,
					1,
					2
				];
				break;
			default: throw Error("Invalid or unsupported photometric interpretation.");
		}
		let p = {
			window: u,
			interleave: !0,
			samples: f,
			pool: r,
			width: i,
			height: a,
			resampleMethod: s,
			signal: l
		}, { fileDirectory: m } = this, h = await this.readRasters(p), g = 2 ** this.fileDirectory.BitsPerSample[0], _;
		switch (d) {
			case t.WhiteIsZero:
				_ = $v(h, g);
				break;
			case t.BlackIsZero:
				_ = ey(h, g);
				break;
			case t.Palette:
				_ = ty(h, m.ColorMap);
				break;
			case t.CMYK:
				_ = ny(h);
				break;
			case t.YCbCr:
				_ = ry(h);
				break;
			case t.CIELab:
				_ = sy(h);
				break;
			default: throw Error("Unsupported photometric interpretation.");
		}
		if (!n) {
			let e = new Uint8Array(_.length / 3), t = new Uint8Array(_.length / 3), n = new Uint8Array(_.length / 3);
			for (let r = 0, i = 0; r < _.length; r += 3, ++i) e[i] = _[r], t[i] = _[r + 1], n[i] = _[r + 2];
			_ = [
				e,
				t,
				n
			];
		}
		return _.width = h.width, _.height = h.height, _;
	}
	getTiePoints() {
		if (!this.fileDirectory.ModelTiepoint) return [];
		let e = [];
		for (let t = 0; t < this.fileDirectory.ModelTiepoint.length; t += 6) e.push({
			i: this.fileDirectory.ModelTiepoint[t],
			j: this.fileDirectory.ModelTiepoint[t + 1],
			k: this.fileDirectory.ModelTiepoint[t + 2],
			x: this.fileDirectory.ModelTiepoint[t + 3],
			y: this.fileDirectory.ModelTiepoint[t + 4],
			z: this.fileDirectory.ModelTiepoint[t + 5]
		});
		return e;
	}
	getGDALMetadata(e = null) {
		let t = {};
		if (!this.fileDirectory.GDAL_METADATA) return null;
		let n = this.fileDirectory.GDAL_METADATA, r = (0, Qv.default)(n, "Item");
		r = e === null ? r.filter((e) => (0, Zv.default)(e, "sample") === void 0) : r.filter((t) => Number((0, Zv.default)(t, "sample")) === e);
		for (let e = 0; e < r.length; ++e) {
			let n = r[e];
			t[(0, Zv.default)(n, "name")] = n.inner;
		}
		return t;
	}
	getGDALNoData() {
		if (!this.fileDirectory.GDAL_NODATA) return null;
		let e = this.fileDirectory.GDAL_NODATA;
		return Number(e.substring(0, e.length - 1));
	}
	getOrigin() {
		let e = this.fileDirectory.ModelTiepoint, t = this.fileDirectory.ModelTransformation;
		if (e && e.length === 6) return [
			e[3],
			e[4],
			e[5]
		];
		if (t) return [
			t[3],
			t[7],
			t[11]
		];
		throw Error("The image does not have an affine transformation.");
	}
	getResolution(e = null) {
		let t = this.fileDirectory.ModelPixelScale, n = this.fileDirectory.ModelTransformation;
		if (t) return [
			t[0],
			-t[1],
			t[2]
		];
		if (n) return n[1] === 0 && n[4] === 0 ? [
			n[0],
			-n[5],
			n[10]
		] : [
			Math.sqrt(n[0] * n[0] + n[4] * n[4]),
			-Math.sqrt(n[1] * n[1] + n[5] * n[5]),
			n[10]
		];
		if (e) {
			let [t, n, r] = e.getResolution();
			return [
				t * e.getWidth() / this.getWidth(),
				n * e.getHeight() / this.getHeight(),
				r * e.getWidth() / this.getWidth()
			];
		}
		throw Error("The image does not have an affine transformation.");
	}
	pixelIsArea() {
		return this.geoKeys.GTRasterTypeGeoKey === 1;
	}
	getBoundingBox(e = !1) {
		let t = this.getHeight(), n = this.getWidth();
		if (this.fileDirectory.ModelTransformation && !e) {
			let [e, r, i, a, o, s, c, l] = this.fileDirectory.ModelTransformation, u = [
				[0, 0],
				[0, t],
				[n, 0],
				[n, t]
			].map(([t, n]) => [a + e * t + r * n, l + o * t + s * n]), d = u.map((e) => e[0]), f = u.map((e) => e[1]);
			return [
				Math.min(...d),
				Math.min(...f),
				Math.max(...d),
				Math.max(...f)
			];
		} else {
			let e = this.getOrigin(), r = this.getResolution(), i = e[0], a = e[1], o = i + r[0] * n, s = a + r[1] * t;
			return [
				Math.min(i, o),
				Math.min(a, s),
				Math.max(i, o),
				Math.max(a, s)
			];
		}
	}
}, wy = class {
	constructor(e) {
		this._dataView = new DataView(e);
	}
	get buffer() {
		return this._dataView.buffer;
	}
	getUint64(e, t) {
		let n = this.getUint32(e, t), r = this.getUint32(e + 4, t), i;
		if (t) {
			if (i = n + 2 ** 32 * r, !Number.isSafeInteger(i)) throw Error(`${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
			return i;
		}
		if (i = 2 ** 32 * n + r, !Number.isSafeInteger(i)) throw Error(`${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
		return i;
	}
	getInt64(e, t) {
		let n = 0, r = (this._dataView.getUint8(e + (t ? 7 : 0)) & 128) > 0, i = !0;
		for (let a = 0; a < 8; a++) {
			let o = this._dataView.getUint8(e + (t ? a : 7 - a));
			r && (i ? o !== 0 && (o = ~(o - 1) & 255, i = !1) : o = ~o & 255), n += o * 256 ** a;
		}
		return r && (n = -n), n;
	}
	getUint8(e, t) {
		return this._dataView.getUint8(e, t);
	}
	getInt8(e, t) {
		return this._dataView.getInt8(e, t);
	}
	getUint16(e, t) {
		return this._dataView.getUint16(e, t);
	}
	getInt16(e, t) {
		return this._dataView.getInt16(e, t);
	}
	getUint32(e, t) {
		return this._dataView.getUint32(e, t);
	}
	getInt32(e, t) {
		return this._dataView.getInt32(e, t);
	}
	getFloat16(e, t) {
		return Wv(this._dataView, e, t);
	}
	getFloat32(e, t) {
		return this._dataView.getFloat32(e, t);
	}
	getFloat64(e, t) {
		return this._dataView.getFloat64(e, t);
	}
}, Ty = class {
	constructor(e, t, n, r) {
		this._dataView = new DataView(e), this._sliceOffset = t, this._littleEndian = n, this._bigTiff = r;
	}
	get sliceOffset() {
		return this._sliceOffset;
	}
	get sliceTop() {
		return this._sliceOffset + this.buffer.byteLength;
	}
	get littleEndian() {
		return this._littleEndian;
	}
	get bigTiff() {
		return this._bigTiff;
	}
	get buffer() {
		return this._dataView.buffer;
	}
	covers(e, t) {
		return this.sliceOffset <= e && this.sliceTop >= e + t;
	}
	readUint8(e) {
		return this._dataView.getUint8(e - this._sliceOffset, this._littleEndian);
	}
	readInt8(e) {
		return this._dataView.getInt8(e - this._sliceOffset, this._littleEndian);
	}
	readUint16(e) {
		return this._dataView.getUint16(e - this._sliceOffset, this._littleEndian);
	}
	readInt16(e) {
		return this._dataView.getInt16(e - this._sliceOffset, this._littleEndian);
	}
	readUint32(e) {
		return this._dataView.getUint32(e - this._sliceOffset, this._littleEndian);
	}
	readInt32(e) {
		return this._dataView.getInt32(e - this._sliceOffset, this._littleEndian);
	}
	readFloat32(e) {
		return this._dataView.getFloat32(e - this._sliceOffset, this._littleEndian);
	}
	readFloat64(e) {
		return this._dataView.getFloat64(e - this._sliceOffset, this._littleEndian);
	}
	readUint64(e) {
		let t = this.readUint32(e), n = this.readUint32(e + 4), r;
		if (this._littleEndian) {
			if (r = t + 2 ** 32 * n, !Number.isSafeInteger(r)) throw Error(`${r} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
			return r;
		}
		if (r = 2 ** 32 * t + n, !Number.isSafeInteger(r)) throw Error(`${r} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
		return r;
	}
	readInt64(e) {
		let t = 0, n = (this._dataView.getUint8(e + (this._littleEndian ? 7 : 0)) & 128) > 0, r = !0;
		for (let i = 0; i < 8; i++) {
			let a = this._dataView.getUint8(e + (this._littleEndian ? i : 7 - i));
			n && (r ? a !== 0 && (a = ~(a - 1) & 255, r = !1) : a = ~a & 255), t += a * 256 ** i;
		}
		return n && (t = -t), t;
	}
	readOffset(e) {
		return this._bigTiff ? this.readUint64(e) : this.readUint32(e);
	}
}, Ey = typeof navigator < "u" && navigator.hardwareConcurrency || 2, Dy = class {
	constructor(e = Ey, t) {
		this.workers = null, this._awaitingDecoder = null, this.size = e, this.messageId = 0, e && (this._awaitingDecoder = t ? Promise.resolve(t) : new Promise((e) => {
			import("./decoder-CS6A4AOQ.js").then((t) => {
				e(t.create);
			});
		}), this._awaitingDecoder.then((t) => {
			this._awaitingDecoder = null, this.workers = [];
			for (let n = 0; n < e; n++) this.workers.push({
				worker: t(),
				idle: !0
			});
		}));
	}
	async decode(e, t) {
		return this._awaitingDecoder && await this._awaitingDecoder, this.size === 0 ? uy(e).then((n) => n.decode(e, t)) : new Promise((n) => {
			let r = this.workers.find((e) => e.idle) || this.workers[Math.floor(Math.random() * this.size)];
			r.idle = !1;
			let i = this.messageId++, a = (e) => {
				e.data.id === i && (r.idle = !0, n(e.data.decoded), r.worker.removeEventListener("message", a));
			};
			r.worker.addEventListener("message", a), r.worker.postMessage({
				fileDirectory: e,
				buffer: t,
				id: i
			}, [t]);
		});
	}
	destroy() {
		this.workers &&= (this.workers.forEach((e) => {
			e.worker.terminate();
		}), null);
	}
}, Oy = "\r\n\r\n";
function ky(e) {
	if (Object.fromEntries !== void 0) return Object.fromEntries(e);
	let t = {};
	for (let [n, r] of e) t[n.toLowerCase()] = r;
	return t;
}
function Ay(e) {
	return ky(e.split("\r\n").map((e) => {
		let t = e.split(":").map((e) => e.trim());
		return t[0] = t[0].toLowerCase(), t;
	}));
}
function jy(e) {
	let [t, ...n] = e.split(";").map((e) => e.trim());
	return {
		type: t,
		params: ky(n.map((e) => e.split("=")))
	};
}
function My(e) {
	let t, n, r;
	return e && ([, t, n, r] = e.match(/bytes (\d+)-(\d+)\/(\d+)/), t = parseInt(t, 10), n = parseInt(n, 10), r = parseInt(r, 10)), {
		start: t,
		end: n,
		total: r
	};
}
function Ny(e, t) {
	let n = null, r = new TextDecoder("ascii"), i = [], a = `--${t}`, o = `${a}--`;
	for (let t = 0; t < 10; ++t) r.decode(new Uint8Array(e, t, a.length)) === a && (n = t);
	if (n === null) throw Error("Could not find initial boundary");
	for (; n < e.byteLength;) {
		let t = r.decode(new Uint8Array(e, n, Math.min(a.length + 1024, e.byteLength - n)));
		if (t.length === 0 || t.startsWith(o)) break;
		if (!t.startsWith(a)) throw Error("Part does not start with boundary");
		let s = t.substr(a.length + 2);
		if (s.length === 0) break;
		let c = s.indexOf(Oy), l = Ay(s.substr(0, c)), { start: u, end: d, total: f } = My(l["content-range"]), p = n + a.length + c + 4, m = parseInt(d, 10) + 1 - parseInt(u, 10);
		i.push({
			headers: l,
			data: e.slice(p, p + m),
			offset: u,
			length: m,
			fileSize: f
		}), n = p + m + 4;
	}
	return i;
}
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/source/basesource.js
var Py = class {
	async fetch(e, t = void 0) {
		return Promise.all(e.map((e) => this.fetchSlice(e, t)));
	}
	async fetchSlice(e) {
		throw Error(`fetching of slice ${e} not possible, not implemented`);
	}
	get fileSize() {
		return null;
	}
	async close() {}
}, Fy = class extends Map {
	constructor(e = {}) {
		if (super(), !(e.maxSize && e.maxSize > 0)) throw TypeError("`maxSize` must be a number greater than 0");
		if (typeof e.maxAge == "number" && e.maxAge === 0) throw TypeError("`maxAge` must be a number greater than 0");
		this.maxSize = e.maxSize, this.maxAge = e.maxAge || Infinity, this.onEviction = e.onEviction, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
	}
	_emitEvictions(e) {
		if (typeof this.onEviction == "function") for (let [t, n] of e) this.onEviction(t, n.value);
	}
	_deleteIfExpired(e, t) {
		return typeof t.expiry == "number" && t.expiry <= Date.now() ? (typeof this.onEviction == "function" && this.onEviction(e, t.value), this.delete(e)) : !1;
	}
	_getOrDeleteIfExpired(e, t) {
		if (this._deleteIfExpired(e, t) === !1) return t.value;
	}
	_getItemValue(e, t) {
		return t.expiry ? this._getOrDeleteIfExpired(e, t) : t.value;
	}
	_peek(e, t) {
		let n = t.get(e);
		return this._getItemValue(e, n);
	}
	_set(e, t) {
		this.cache.set(e, t), this._size++, this._size >= this.maxSize && (this._size = 0, this._emitEvictions(this.oldCache), this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
	}
	_moveToRecent(e, t) {
		this.oldCache.delete(e), this._set(e, t);
	}
	*_entriesAscending() {
		for (let e of this.oldCache) {
			let [t, n] = e;
			this.cache.has(t) || this._deleteIfExpired(t, n) === !1 && (yield e);
		}
		for (let e of this.cache) {
			let [t, n] = e;
			this._deleteIfExpired(t, n) === !1 && (yield e);
		}
	}
	get(e) {
		if (this.cache.has(e)) {
			let t = this.cache.get(e);
			return this._getItemValue(e, t);
		}
		if (this.oldCache.has(e)) {
			let t = this.oldCache.get(e);
			if (this._deleteIfExpired(e, t) === !1) return this._moveToRecent(e, t), t.value;
		}
	}
	set(e, t, { maxAge: n = this.maxAge } = {}) {
		let r = typeof n == "number" && n !== Infinity ? Date.now() + n : void 0;
		return this.cache.has(e) ? this.cache.set(e, {
			value: t,
			expiry: r
		}) : this._set(e, {
			value: t,
			expiry: r
		}), this;
	}
	has(e) {
		return this.cache.has(e) ? !this._deleteIfExpired(e, this.cache.get(e)) : this.oldCache.has(e) ? !this._deleteIfExpired(e, this.oldCache.get(e)) : !1;
	}
	peek(e) {
		if (this.cache.has(e)) return this._peek(e, this.cache);
		if (this.oldCache.has(e)) return this._peek(e, this.oldCache);
	}
	delete(e) {
		let t = this.cache.delete(e);
		return t && this._size--, this.oldCache.delete(e) || t;
	}
	clear() {
		this.cache.clear(), this.oldCache.clear(), this._size = 0;
	}
	resize(e) {
		if (!(e && e > 0)) throw TypeError("`maxSize` must be a number greater than 0");
		let t = [...this._entriesAscending()], n = t.length - e;
		n < 0 ? (this.cache = new Map(t), this.oldCache = /* @__PURE__ */ new Map(), this._size = t.length) : (n > 0 && this._emitEvictions(t.slice(0, n)), this.oldCache = new Map(t.slice(n)), this.cache = /* @__PURE__ */ new Map(), this._size = 0), this.maxSize = e;
	}
	*keys() {
		for (let [e] of this) yield e;
	}
	*values() {
		for (let [, e] of this) yield e;
	}
	*[Symbol.iterator]() {
		for (let e of this.cache) {
			let [t, n] = e;
			this._deleteIfExpired(t, n) === !1 && (yield [t, n.value]);
		}
		for (let e of this.oldCache) {
			let [t, n] = e;
			this.cache.has(t) || this._deleteIfExpired(t, n) === !1 && (yield [t, n.value]);
		}
	}
	*entriesDescending() {
		let e = [...this.cache];
		for (let t = e.length - 1; t >= 0; --t) {
			let [n, r] = e[t];
			this._deleteIfExpired(n, r) === !1 && (yield [n, r.value]);
		}
		e = [...this.oldCache];
		for (let t = e.length - 1; t >= 0; --t) {
			let [n, r] = e[t];
			this.cache.has(n) || this._deleteIfExpired(n, r) === !1 && (yield [n, r.value]);
		}
	}
	*entriesAscending() {
		for (let [e, t] of this._entriesAscending()) yield [e, t.value];
	}
	get size() {
		if (!this._size) return this.oldCache.size;
		let e = 0;
		for (let t of this.oldCache.keys()) this.cache.has(t) || e++;
		return Math.min(this._size + e, this.maxSize);
	}
	entries() {
		return this.entriesAscending();
	}
	forEach(e, t = this) {
		for (let [n, r] of this.entriesAscending()) e.call(t, r, n, this);
	}
	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
};
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/utils.js
async function Iy(e) {
	return new Promise((t) => setTimeout(t, e));
}
function Ly(e, t) {
	let n = Array.isArray(e) ? e : Array.from(e), r = Array.isArray(t) ? t : Array.from(t);
	return n.map((e, t) => [e, r[t]]);
}
var Ry = class e extends Error {
	constructor(t) {
		super(t), Error.captureStackTrace && Error.captureStackTrace(this, e), this.name = "AbortError";
	}
}, zy = class extends Error {
	constructor(e, t) {
		super(t), this.errors = e, this.message = t, this.name = "AggregateError";
	}
}, By = class {
	constructor(e, t, n = null) {
		this.offset = e, this.length = t, this.data = n;
	}
	get top() {
		return this.offset + this.length;
	}
}, Vy = class {
	constructor(e, t, n) {
		this.offset = e, this.length = t, this.blockIds = n;
	}
}, Hy = class extends Py {
	constructor(e, { blockSize: t = 65536, cacheSize: n = 100 } = {}) {
		super(), this.source = e, this.blockSize = t, this.blockCache = new Fy({
			maxSize: n,
			onEviction: (e, t) => {
				this.evictedBlocks.set(e, t);
			}
		}), this.evictedBlocks = /* @__PURE__ */ new Map(), this.blockRequests = /* @__PURE__ */ new Map(), this.blockIdsToFetch = /* @__PURE__ */ new Set(), this.abortedBlockIds = /* @__PURE__ */ new Set();
	}
	get fileSize() {
		return this.source.fileSize;
	}
	async fetch(e, t) {
		let n = [], r = [], i = [];
		this.evictedBlocks.clear();
		for (let { offset: t, length: a } of e) {
			let e = t + a, { fileSize: o } = this;
			o !== null && (e = Math.min(e, o));
			let s = Math.floor(t / this.blockSize) * this.blockSize;
			for (let t = s; t < e; t += this.blockSize) {
				let e = Math.floor(t / this.blockSize);
				!this.blockCache.has(e) && !this.blockRequests.has(e) && (this.blockIdsToFetch.add(e), r.push(e)), this.blockRequests.has(e) && n.push(this.blockRequests.get(e)), i.push(e);
			}
		}
		await Iy(), this.fetchBlocks(t);
		let a = [];
		for (let e of r) this.blockRequests.has(e) && a.push(this.blockRequests.get(e));
		await Promise.allSettled(n), await Promise.allSettled(a);
		let o = [], s = i.filter((e) => this.abortedBlockIds.has(e) || !this.blockCache.has(e));
		if (s.forEach((e) => this.blockIdsToFetch.add(e)), s.length > 0 && t && !t.aborted) {
			this.fetchBlocks(null);
			for (let e of s) {
				let t = this.blockRequests.get(e);
				if (!t) throw Error(`Block ${e} is not in the block requests`);
				o.push(t);
			}
			await Promise.allSettled(o);
		}
		if (t && t.aborted) throw new Ry("Request was aborted");
		let c = i.map((e) => this.blockCache.get(e) || this.evictedBlocks.get(e)), l = c.filter((e) => !e);
		if (l.length) throw new zy(l, "Request failed");
		let u = new Map(Ly(i, c));
		return this.readSliceData(e, u);
	}
	fetchBlocks(e) {
		if (this.blockIdsToFetch.size > 0) {
			let t = this.groupBlocks(this.blockIdsToFetch), n = this.source.fetch(t, e);
			for (let r = 0; r < t.length; ++r) {
				let i = t[r];
				for (let t of i.blockIds) this.blockRequests.set(t, (async () => {
					try {
						let e = (await n)[r], i = t * this.blockSize, a = i - e.offset, o = Math.min(a + this.blockSize, e.data.byteLength), s = e.data.slice(a, o), c = new By(i, s.byteLength, s, t);
						this.blockCache.set(t, c), this.abortedBlockIds.delete(t);
					} catch (n) {
						if (n.name === "AbortError") n.signal = e, this.blockCache.delete(t), this.abortedBlockIds.add(t);
						else throw n;
					} finally {
						this.blockRequests.delete(t);
					}
				})());
			}
			this.blockIdsToFetch.clear();
		}
	}
	groupBlocks(e) {
		let t = Array.from(e).sort((e, t) => e - t);
		if (t.length === 0) return [];
		let n = [], r = null, i = [];
		for (let e of t) r === null || r + 1 === e ? (n.push(e), r = e) : (i.push(new Vy(n[0] * this.blockSize, n.length * this.blockSize, n)), n = [e], r = e);
		return i.push(new Vy(n[0] * this.blockSize, n.length * this.blockSize, n)), i;
	}
	readSliceData(e, t) {
		return e.map((e) => {
			let n = e.offset + e.length;
			this.fileSize !== null && (n = Math.min(this.fileSize, n));
			let r = Math.floor(e.offset / this.blockSize), i = Math.floor(n / this.blockSize), a = new ArrayBuffer(e.length), o = new Uint8Array(a);
			for (let a = r; a <= i; ++a) {
				let r = t.get(a), i = r.offset - e.offset, s = r.top - n, c = 0, l = 0, u;
				i < 0 ? c = -i : i > 0 && (l = i), u = s < 0 ? r.length - c : n - r.offset - c;
				let d = new Uint8Array(r.data, c, u);
				o.set(d, l);
			}
			return a;
		});
	}
}, Uy = class {
	get ok() {
		return this.status >= 200 && this.status <= 299;
	}
	get status() {
		throw Error("not implemented");
	}
	getHeader(e) {
		throw Error("not implemented");
	}
	async getData() {
		throw Error("not implemented");
	}
}, Wy = class {
	constructor(e) {
		this.url = e;
	}
	async request({ headers: e, signal: t } = {}) {
		throw Error("request is not implemented");
	}
}, Gy = class extends Uy {
	constructor(e) {
		super(), this.response = e;
	}
	get status() {
		return this.response.status;
	}
	getHeader(e) {
		return this.response.headers.get(e);
	}
	async getData() {
		return this.response.arrayBuffer ? await this.response.arrayBuffer() : (await this.response.buffer()).buffer;
	}
}, Ky = class extends Wy {
	constructor(e, t) {
		super(e), this.credentials = t;
	}
	async request({ headers: e, signal: t } = {}) {
		return new Gy(await fetch(this.url, {
			headers: e,
			credentials: this.credentials,
			signal: t
		}));
	}
}, qy = class extends Uy {
	constructor(e, t) {
		super(), this.xhr = e, this.data = t;
	}
	get status() {
		return this.xhr.status;
	}
	getHeader(e) {
		return this.xhr.getResponseHeader(e);
	}
	async getData() {
		return this.data;
	}
}, Jy = class extends Wy {
	constructRequest(e, t) {
		return new Promise((n, r) => {
			let i = new XMLHttpRequest();
			i.open("GET", this.url), i.responseType = "arraybuffer";
			for (let [t, n] of Object.entries(e)) i.setRequestHeader(t, n);
			i.onload = () => {
				let e = i.response;
				n(new qy(i, e));
			}, i.onerror = r, i.onabort = () => r(new Ry("Request aborted")), i.send(), t && (t.aborted && i.abort(), t.addEventListener("abort", () => i.abort()));
		});
	}
	async request({ headers: e, signal: t } = {}) {
		return await this.constructRequest(e, t);
	}
}, Yy = /* @__PURE__ */ s((/* @__PURE__ */ r(((e, t) => {
	t.exports = {};
})))(), 1), Xy = class extends Uy {
	constructor(e, t) {
		super(), this.response = e, this.dataPromise = t;
	}
	get status() {
		return this.response.statusCode;
	}
	getHeader(e) {
		return this.response.headers[e];
	}
	async getData() {
		return await this.dataPromise;
	}
}, Zy = class extends Wy {
	constructor(e) {
		super(e), this.parsedUrl = Yy.default.parse(this.url), this.httpApi = (this.parsedUrl.protocol, Yy.default);
	}
	constructRequest(e, t) {
		return new Promise((n, r) => {
			let i = this.httpApi.get({
				...this.parsedUrl,
				headers: e
			}, (e) => {
				n(new Xy(e, new Promise((t) => {
					let n = [];
					e.on("data", (e) => {
						n.push(e);
					}), e.on("end", () => {
						let e = Buffer.concat(n).buffer;
						t(e);
					}), e.on("error", r);
				})));
			});
			i.on("error", r), t && (t.aborted && i.destroy(new Ry("Request aborted")), t.addEventListener("abort", () => i.destroy(new Ry("Request aborted"))));
		});
	}
	async request({ headers: e, signal: t } = {}) {
		return await this.constructRequest(e, t);
	}
}, Qy = class extends Py {
	constructor(e, t, n, r) {
		super(), this.client = e, this.headers = t, this.maxRanges = n, this.allowFullFile = r, this._fileSize = null;
	}
	async fetch(e, t) {
		return this.maxRanges >= e.length ? this.fetchSlices(e, t) : (this.maxRanges > 0 && e.length, Promise.all(e.map((e) => this.fetchSlice(e, t))));
	}
	async fetchSlices(e, t) {
		let n = await this.client.request({
			headers: {
				...this.headers,
				Range: `bytes=${e.map(({ offset: e, length: t }) => `${e}-${e + t}`).join(",")}`
			},
			signal: t
		});
		if (!n.ok) throw Error("Error fetching data.");
		if (n.status === 206) {
			let { type: r, params: i } = jy(n.getHeader("content-type"));
			if (r === "multipart/byteranges") {
				let e = Ny(await n.getData(), i.boundary);
				return this._fileSize = e[0].fileSize || null, e;
			}
			let a = await n.getData(), { start: o, end: s, total: c } = My(n.getHeader("content-range"));
			this._fileSize = c || null;
			let l = [{
				data: a,
				offset: o,
				length: s - o
			}];
			if (e.length > 1) {
				let n = await Promise.all(e.slice(1).map((e) => this.fetchSlice(e, t)));
				return l.concat(n);
			}
			return l;
		} else {
			if (!this.allowFullFile) throw Error("Server responded with full file");
			let e = await n.getData();
			return this._fileSize = e.byteLength, [{
				data: e,
				offset: 0,
				length: e.byteLength
			}];
		}
	}
	async fetchSlice(e, t) {
		let { offset: n, length: r } = e, i = await this.client.request({
			headers: {
				...this.headers,
				Range: `bytes=${n}-${n + r}`
			},
			signal: t
		});
		if (!i.ok) throw Error("Error fetching data.");
		if (i.status === 206) {
			let e = await i.getData(), { total: t } = My(i.getHeader("content-range"));
			return this._fileSize = t || null, {
				data: e,
				offset: n,
				length: r
			};
		} else {
			if (!this.allowFullFile) throw Error("Server responded with full file");
			let e = await i.getData();
			return this._fileSize = e.byteLength, {
				data: e,
				offset: 0,
				length: e.byteLength
			};
		}
	}
	get fileSize() {
		return this._fileSize;
	}
};
function $y(e, { blockSize: t, cacheSize: n }) {
	return t === null ? e : new Hy(e, {
		blockSize: t,
		cacheSize: n
	});
}
function eb(e, { headers: t = {}, credentials: n, maxRanges: r = 0, allowFullFile: i = !1, ...a } = {}) {
	return $y(new Qy(new Ky(e, n), t, r, i), a);
}
function tb(e, { headers: t = {}, maxRanges: n = 0, allowFullFile: r = !1, ...i } = {}) {
	return $y(new Qy(new Jy(e), t, n, r), i);
}
function nb(e, { headers: t = {}, maxRanges: n = 0, allowFullFile: r = !1, ...i } = {}) {
	return $y(new Qy(new Zy(e), t, n, r), i);
}
function rb(e, { forceXHR: t = !1, ...n } = {}) {
	return typeof fetch == "function" && !t ? eb(e, n) : typeof XMLHttpRequest < "u" ? tb(e, n) : nb(e, n);
}
//#endregion
//#region node_modules/.pnpm/geotiff@2.1.3/node_modules/geotiff/dist-module/geotiff.js
function ib(e) {
	switch (e) {
		case i.BYTE:
		case i.ASCII:
		case i.SBYTE:
		case i.UNDEFINED: return 1;
		case i.SHORT:
		case i.SSHORT: return 2;
		case i.LONG:
		case i.SLONG:
		case i.FLOAT:
		case i.IFD: return 4;
		case i.RATIONAL:
		case i.SRATIONAL:
		case i.DOUBLE:
		case i.LONG8:
		case i.SLONG8:
		case i.IFD8: return 8;
		default: throw RangeError(`Invalid field type: ${e}`);
	}
}
function ab(t) {
	let n = t.GeoKeyDirectory;
	if (!n) return null;
	let r = {};
	for (let i = 4; i <= n[3] * 4; i += 4) {
		let o = a[n[i]], s = n[i + 1] ? e[n[i + 1]] : null, c = n[i + 2], l = n[i + 3], u = null;
		if (!s) u = l;
		else {
			if (u = t[s], u == null) throw Error(`Could not get value of geoKey '${o}'.`);
			typeof u == "string" ? u = u.substring(l, l + c - 1) : u.subarray && (u = u.subarray(l, l + c), c === 1 && (u = u[0]));
		}
		r[o] = u;
	}
	return r;
}
function ob(e, t, n, r) {
	let a = null, o = null, s = ib(t);
	switch (t) {
		case i.BYTE:
		case i.ASCII:
		case i.UNDEFINED:
			a = new Uint8Array(n), o = e.readUint8;
			break;
		case i.SBYTE:
			a = new Int8Array(n), o = e.readInt8;
			break;
		case i.SHORT:
			a = new Uint16Array(n), o = e.readUint16;
			break;
		case i.SSHORT:
			a = new Int16Array(n), o = e.readInt16;
			break;
		case i.LONG:
		case i.IFD:
			a = new Uint32Array(n), o = e.readUint32;
			break;
		case i.SLONG:
			a = new Int32Array(n), o = e.readInt32;
			break;
		case i.LONG8:
		case i.IFD8:
			a = Array(n), o = e.readUint64;
			break;
		case i.SLONG8:
			a = Array(n), o = e.readInt64;
			break;
		case i.RATIONAL:
			a = new Uint32Array(n * 2), o = e.readUint32;
			break;
		case i.SRATIONAL:
			a = new Int32Array(n * 2), o = e.readInt32;
			break;
		case i.FLOAT:
			a = new Float32Array(n), o = e.readFloat32;
			break;
		case i.DOUBLE:
			a = new Float64Array(n), o = e.readFloat64;
			break;
		default: throw RangeError(`Invalid field type: ${t}`);
	}
	if (t === i.RATIONAL || t === i.SRATIONAL) for (let t = 0; t < n; t += 2) a[t] = o.call(e, r + t * s), a[t + 1] = o.call(e, r + (t * s + 4));
	else for (let t = 0; t < n; ++t) a[t] = o.call(e, r + t * s);
	return t === i.ASCII ? new TextDecoder("utf-8").decode(a) : a;
}
var sb = class {
	constructor(e, t, n) {
		this.fileDirectory = e, this.geoKeyDirectory = t, this.nextIFDByteOffset = n;
	}
}, cb = class extends Error {
	constructor(e) {
		super(`No image at index ${e}`), this.index = e;
	}
}, lb = class {
	async readRasters(e = {}) {
		let { window: t, width: n, height: r } = e, { resX: i, resY: a, bbox: o } = e, s = await this.getImage(), c = s, l = await this.getImageCount(), u = s.getBoundingBox();
		if (t && o) throw Error("Both \"bbox\" and \"window\" passed.");
		if (n || r) {
			if (t) {
				let [e, n] = s.getOrigin(), [r, i] = s.getResolution();
				o = [
					e + t[0] * r,
					n + t[1] * i,
					e + t[2] * r,
					n + t[3] * i
				];
			}
			let e = o || u;
			if (n) {
				if (i) throw Error("Both width and resX passed");
				i = (e[2] - e[0]) / n;
			}
			if (r) {
				if (a) throw Error("Both width and resY passed");
				a = (e[3] - e[1]) / r;
			}
		}
		if (i || a) {
			let e = [];
			for (let t = 0; t < l; ++t) {
				let n = await this.getImage(t), { SubfileType: r, NewSubfileType: i } = n.fileDirectory;
				(t === 0 || r === 2 || i & 1) && e.push(n);
			}
			e.sort((e, t) => e.getWidth() - t.getWidth());
			for (let t = 0; t < e.length; ++t) {
				let n = e[t], r = (u[2] - u[0]) / n.getWidth(), o = (u[3] - u[1]) / n.getHeight();
				if (c = n, i && i > r || a && a > o) break;
			}
		}
		let d = t;
		if (o) {
			let [e, t] = s.getOrigin(), [n, r] = c.getResolution(s);
			d = [
				Math.round((o[0] - e) / n),
				Math.round((o[1] - t) / r),
				Math.round((o[2] - e) / n),
				Math.round((o[3] - t) / r)
			], d = [
				Math.min(d[0], d[2]),
				Math.min(d[1], d[3]),
				Math.max(d[0], d[2]),
				Math.max(d[1], d[3])
			];
		}
		return c.readRasters({
			...e,
			window: d
		});
	}
}, ub = class t extends lb {
	constructor(e, t, n, r, i = {}) {
		super(), this.source = e, this.littleEndian = t, this.bigTiff = n, this.firstIFDOffset = r, this.cache = i.cache || !1, this.ifdRequests = [], this.ghostValues = null;
	}
	async getSlice(e, t) {
		let n = this.bigTiff ? 4048 : 1024;
		return new Ty((await this.source.fetch([{
			offset: e,
			length: t === void 0 ? n : t
		}]))[0], e, this.littleEndian, this.bigTiff);
	}
	async parseFileDirectoryAt(t) {
		let r = this.bigTiff ? 20 : 12, a = this.bigTiff ? 8 : 2, o = await this.getSlice(t), s = this.bigTiff ? o.readUint64(t) : o.readUint16(t), c = s * r + (this.bigTiff ? 16 : 6);
		o.covers(t, c) || (o = await this.getSlice(t, c));
		let l = {}, u = t + (this.bigTiff ? 8 : 2);
		for (let t = 0; t < s; u += r, ++t) {
			let t = o.readUint16(u), r = o.readUint16(u + 2), a = this.bigTiff ? o.readUint64(u + 4) : o.readUint32(u + 4), s, c, d = ib(r), f = u + (this.bigTiff ? 12 : 8);
			if (d * a <= (this.bigTiff ? 8 : 4)) s = ob(o, r, a, f);
			else {
				let e = o.readOffset(f), t = ib(r) * a;
				s = o.covers(e, t) ? ob(o, r, a, e) : ob(await this.getSlice(e, t), r, a, e);
			}
			c = a === 1 && n.indexOf(t) === -1 && !(r === i.RATIONAL || r === i.SRATIONAL) ? s[0] : s, l[e[t]] = c;
		}
		return new sb(l, ab(l), o.readOffset(t + a + r * s));
	}
	async requestIFD(e) {
		if (this.ifdRequests[e]) return this.ifdRequests[e];
		if (e === 0) return this.ifdRequests[e] = this.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[e];
		if (!this.ifdRequests[e - 1]) try {
			this.ifdRequests[e - 1] = this.requestIFD(e - 1);
		} catch (t) {
			throw t instanceof cb ? new cb(e) : t;
		}
		return this.ifdRequests[e] = (async () => {
			let t = await this.ifdRequests[e - 1];
			if (t.nextIFDByteOffset === 0) throw new cb(e);
			return this.parseFileDirectoryAt(t.nextIFDByteOffset);
		})(), this.ifdRequests[e];
	}
	async getImage(e = 0) {
		let t = await this.requestIFD(e);
		return new Cy(t.fileDirectory, t.geoKeyDirectory, this.dataView, this.littleEndian, this.cache, this.source);
	}
	async getImageCount() {
		let e = 0, t = !0;
		for (; t;) try {
			await this.requestIFD(e), ++e;
		} catch (e) {
			if (e instanceof cb) t = !1;
			else throw e;
		}
		return e;
	}
	async getGhostValues() {
		let e = this.bigTiff ? 16 : 8;
		if (this.ghostValues) return this.ghostValues;
		let t = await this.getSlice(e, 130);
		if (ob(t, i.ASCII, 30, e) === "GDAL_STRUCTURAL_METADATA_SIZE=") {
			let n = ob(t, i.ASCII, 130, e).split("\n")[0], r = Number(n.split("=")[1].split(" ")[0]) + n.length;
			r > 130 && (t = await this.getSlice(e, r));
			let a = ob(t, i.ASCII, r, e);
			this.ghostValues = {}, a.split("\n").filter((e) => e.length > 0).map((e) => e.split("=")).forEach(([e, t]) => {
				this.ghostValues[e] = t;
			});
		}
		return this.ghostValues;
	}
	static async fromSource(e, n, r) {
		let i = (await e.fetch([{
			offset: 0,
			length: 1024
		}], r))[0], a = new wy(i), o = a.getUint16(0, 0), s;
		if (o === 18761) s = !0;
		else if (o === 19789) s = !1;
		else throw TypeError("Invalid byte order value.");
		let c = a.getUint16(2, s), l;
		if (c === 42) l = !1;
		else if (c === 43) {
			if (l = !0, a.getUint16(4, s) !== 8) throw Error("Unsupported offset byte-size.");
		} else throw TypeError("Invalid magic number.");
		let u = l ? a.getUint64(8, s) : a.getUint32(4, s);
		return new t(e, s, l, u, n);
	}
	close() {
		return typeof this.source.close == "function" ? this.source.close() : !1;
	}
};
async function db(e, t = {}, n) {
	return ub.fromSource(rb(e, t), n);
}
//#endregion
//#region src/lib/TiffTileLoader.js
var fb = class {
	constructor(e) {
		this.url = e, this.tiff = null, this.images = [], this.info = null, this.pool = new Dy();
	}
	async open() {
		this.tiff = await db(this.url);
		let e = await this.tiff.getImageCount();
		this.images = [];
		for (let t = 0; t < e; t++) this.images.push(await this.tiff.getImage(t));
		let t = this.images[0], n = t.getWidth(), r = t.getHeight(), i = t.getSamplesPerPixel(), a = t.getTileWidth ? t.getTileWidth() : 256, o = 4, s = 1, c = 1;
		i === 3 ? (o = 4, s = 1, c = 1) : i === 9 ? (o = 2, s = 3, c = 3) : i === 18 ? (o = 3, s = 6, c = 6) : i % 3 == 0 && (c = i / 3, s = c, o = 1);
		let l = t.fileDirectory.ImageDescription || t.fileDirectory[270], u = [], d = [], f = null;
		if (l) try {
			typeof l == "string" && (l = l.replace(/\0/g, "").trim());
			let e = JSON.parse(l);
			e.type === "neural" ? (o = 5, s = 1, c = 1, f = e.weights) : (u = e.bias || [], d = e.scale || []);
		} catch (e) {
			console.warn("[TiffTileLoader] Failed to parse TIFF ImageDescription:", e);
		}
		return this.numCoeffs = c, this.samplesPerPixel = i, this.rtiType = o, this.info = {
			type: o,
			width: n,
			height: r,
			tileSize: a,
			layerCount: s,
			numCoeffs: c,
			bias: u,
			scale: d,
			weights: f,
			isTiff: !0
		}, console.log(`[TiffTileLoader] Opened ${this.url}: ${n}×${r}, ${i} channels, ${e} pyramid levels`), this.info;
	}
	_tiffLevelForNodeLevel(e, t) {
		return Math.max(0, t - 1 - e);
	}
	async loadTileTextures(e, t, n) {
		let r = this._tiffLevelForNodeLevel(e.level, t), i = this.images[Math.min(r, this.images.length - 1)], a = i.getWidth(), o = i.getHeight(), s = 2 ** Math.ceil(Math.log2(Math.max(a, o))), c = (s - a) / 2, l = (s - o) / 2, u = Math.max(0, Math.floor(e.box.minX * s - c)), d = Math.max(0, Math.floor((1 - e.box.maxY) * s - l)), f = Math.min(a, Math.ceil(e.box.maxX * s - c)), p = Math.min(o, Math.ceil((1 - e.box.minY) * s - l)), m = f - u, h = p - d;
		if (m <= 0 || h <= 0) return null;
		let g = await i.readRasters({
			window: [
				u,
				d,
				f,
				p
			],
			interleave: !1,
			pool: this.pool
		});
		this.samplesPerPixel, m * h;
		let _ = [];
		for (let e = 0; e < this.numCoeffs; e++) {
			let t = new Uint8Array(m * h * 4);
			for (let n = 0; n < h; n++) {
				let r = n * m, i = (h - 1 - n) * m;
				for (let n = 0; n < m; n++) {
					let a = r + n, o = i + n, s, c, l;
					if (this.rtiType === 5) {
						s = g[0][a], c = g[1][a], l = g[2][a];
						let e = g[3][a];
						t[o * 4 + 0] = s, t[o * 4 + 1] = c, t[o * 4 + 2] = l, t[o * 4 + 3] = e;
						continue;
					}
					this.rtiType === 4 ? (s = g[0][a], c = g[1][a], l = g[2][a]) : this.rtiType === 2 ? (s = g[e * 3 + 0][a], c = g[e * 3 + 1][a], l = g[e * 3 + 2][a]) : this.rtiType === 3 ? (s = g[e][a], c = g[6 + e][a], l = g[12 + e][a]) : (s = g[e][a], c = g[this.numCoeffs + e][a], l = g[2 * this.numCoeffs + e][a]), t[o * 4 + 0] = s, t[o * 4 + 1] = c, t[o * 4 + 2] = l, t[o * 4 + 3] = 255;
				}
			}
			let n = new Kd(t, m, h, Ns);
			n.colorSpace = "", this.rtiType === 5 && (n.minFilter = hs, n.magFilter = hs), n.needsUpdate = !0, _.push(n);
		}
		return _;
	}
}, pb = { class: "w-16 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-4 relative z-50 shrink-0" }, mb = {
	key: 1,
	class: "group relative mt-4 flex flex-col items-center w-full px-2"
}, hb = { class: "mt-auto flex flex-col items-center w-full" }, gb = { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, _b = { class: "text-white font-bold mb-0.5" }, vb = {
	key: 0,
	class: "absolute inset-0 z-50 flex items-center justify-center p-4"
}, yb = { class: "relative bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-slate-300" }, bb = {
	key: 0,
	class: "absolute inset-0 z-50 flex items-center justify-center p-4"
}, xb = { class: "relative bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-slate-300" }, Sb = { class: "flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-xl p-2" }, Cb = ["value"], wb = {
	key: 0,
	class: "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10"
}, Tb = !0, Eb = 100, Db = {
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
		}
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ Gt(null), r = /* @__PURE__ */ Gt(null), i = /* @__PURE__ */ Gt(null), a = /* @__PURE__ */ Gt(null), o = /* @__PURE__ */ Gt(!0), s = /* @__PURE__ */ Gt(""), c = /* @__PURE__ */ Gt(!1), l = /* @__PURE__ */ Gt(!1), u = /* @__PURE__ */ Gt(""), d = /* @__PURE__ */ Gt(!1), f = /* @__PURE__ */ Gt(!1), p = /* @__PURE__ */ Gt(0), m = /* @__PURE__ */ Gt("pan"), h = /* @__PURE__ */ Gt(0), g = /* @__PURE__ */ Gt(10), _ = /* @__PURE__ */ Gt(null), v = /* @__PURE__ */ Gt(new J(0, 0, 1)), y = /* @__PURE__ */ Kt(null), b = /* @__PURE__ */ Kt(null), x = /* @__PURE__ */ Kt(null), S = /* @__PURE__ */ Kt(null), C = null, w = /* @__PURE__ */ Kt(null), T = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Map(), D = new Bf(), O = /* @__PURE__ */ Kt(null), k = /* @__PURE__ */ new Map();
		vr(async () => {
			try {
				ie(), await A(), w.value = new T_(_.value.width, _.value.height, _.value.tileSize), ee(), ae(), o.value = !1, vn(() => {
					n.value && n.value.dispatchEvent(new CustomEvent("rti-loaded", {
						detail: _.value,
						bubbles: !0
					}));
				});
			} catch (e) {
				s.value = e.message, o.value = !1;
			}
		}), xr(() => {
			C && cancelAnimationFrame(C), S.value && (S.value.dispose(), i.value.removeChild(S.value.domElement)), x.value && x.value.dispose();
			for (let e of k.values()) e.forEach((e) => e.dispose());
			k.clear();
		});
		let A = async () => {
			console.log("props: ", t);
			let e = t.url.split(/[?#]/)[0].trim().toLowerCase();
			if (e.endsWith(".tif") || e.endsWith(".tiff")) {
				let e = new fb(t.url), n = await e.open();
				O.value = e, _.value = n, console.log("[TiffTileLoader] RTI Info:", _.value);
				return;
			}
			let n = await fetch(`${t.url}/info.json`);
			if (n.ok) {
				let e = await n.json(), t = {
					HSH_RTI: 1,
					LRGB_PTM: 2,
					RGB_PTM: 3,
					IMAGE: 4
				}, r = e.content || e, i = e.tree || e;
				_.value = {
					type: t[r.type] ?? 4,
					width: r.width,
					height: r.height,
					tileSize: i.tileSize,
					layerCount: r.layerCount ?? r.coefficients ?? 1,
					bias: r.bias ?? [],
					scale: r.scale ?? []
				}, console.log("Parsed RTI Info (JSON):", _.value);
				return;
			}
			if (n = await fetch(`${t.url}/info.xml`), !n.ok) throw Error(`Could not load info from ${t.url}`);
			let r = await n.text(), i = new DOMParser().parseFromString(r, "text/xml"), a = (e) => {
				let t = i.getElementsByTagName(e)[0];
				return t ? t.textContent : null;
			}, o = i.getElementsByTagName("Content")[0], s = i.getElementsByTagName("Size")[0];
			if (o && s) {
				let e = o.getAttribute("type"), t = {
					HSH: 1,
					HSH_RTI: 1,
					LRGB_PTM: 2,
					RGB_PTM: 3,
					IMAGE: 4
				}, n = i.getElementsByTagName("Tree")[0], r = 256;
				if (n) {
					let e = n.textContent.trim().split("\n");
					e.length > 1 && (r = parseInt(e[1]));
				}
				let a = i.getElementsByTagName("Bias")[0], c = i.getElementsByTagName("Scale")[0], l = a ? a.textContent.trim().split(/\s+/).map(parseFloat) : [], u = c ? c.textContent.trim().split(/\s+/).map(parseFloat) : [], d = parseInt(s.getAttribute("coefficients")) || 3, f = t[e] || 2, p = d;
				f === 2 && (p = 3), _.value = {
					type: f,
					width: parseInt(s.getAttribute("width")),
					height: parseInt(s.getAttribute("height")),
					tileSize: r,
					layerCount: p,
					bias: l,
					scale: u
				};
			} else _.value = {
				type: parseInt(a("type")),
				width: parseInt(a("width")),
				height: parseInt(a("height")),
				tileSize: parseInt(a("tileSize")),
				layerCount: parseInt(a("layerCount")) || 1
			};
			console.log("Parsed RTI Info (XML):", _.value);
		}, ee = () => {
			let e = r.value.clientWidth, t = r.value.clientHeight;
			y.value = new Eu(), y.value.background = new Z(988970);
			let n = e / t, a = Math.max(_.value.width, _.value.height) / 2;
			b.value = new Yf(-a * n, a * n, a, -a, .1, 1e3);
			let o = new URLSearchParams(window.location.hash.slice(1)), s = parseFloat(o.get("cx")), c = parseFloat(o.get("cy")), l = parseFloat(o.get("z")), u = parseFloat(o.get("lx")), d = parseFloat(o.get("ly")), f = parseInt(o.get("mode"));
			if (!isNaN(s) && !isNaN(c) && !isNaN(l) ? (b.value.position.set(s, c, 10), b.value.zoom = l, b.value.updateProjectionMatrix()) : b.value.position.set(0, 0, 10), !isNaN(u) && !isNaN(d)) {
				let e = Math.sqrt(Math.max(0, 1 - (u * u + d * d)));
				v.value.set(u, d, e).normalize();
			}
			isNaN(f) || (h.value = f), S.value = new jg({
				antialias: !1,
				preserveDrawingBuffer: !0
			}), S.value.setSize(e, t), S.value.setPixelRatio(window.devicePixelRatio), i.value.appendChild(S.value.domElement), x.value = new Hg(b.value, S.value.domElement), !isNaN(s) && !isNaN(c) && x.value.target.set(s, c, 0), x.value.enableRotate = !1, x.value.screenSpacePanning = !0, x.value.mouseButtons = {
				LEFT: ss.PAN,
				MIDDLE: ss.DOLLY,
				RIGHT: ss.NONE
			}, x.value.enableDamping = !0, x.value.dampingFactor = .05, x.value.enabled = m.value === "pan", window.addEventListener("resize", ne);
			let p = () => {
				C = requestAnimationFrame(p), x.value.update(), te(), S.value.render(y.value, b.value);
			};
			p();
		}, te = () => {
			if (!w.value || !b.value) return;
			let e = b.value, n = {
				minX: e.position.x + e.left / e.zoom,
				maxX: e.position.x + e.right / e.zoom,
				minY: e.position.y + e.bottom / e.zoom,
				maxY: e.position.y + e.top / e.zoom
			}, r = (e.top - e.bottom) / e.zoom, i = S.value.domElement.clientHeight / r, a = w.value.maxSize * i;
			window._debugLoggedOnce || (console.log("[RTI Viewer] isDebug evaluated to:", Tb, "from props.debug:", t.debug), window._debugLoggedOnce = !0);
			{
				let e = b.value.zoom.toFixed(2);
				(!window._lastLoggedZoom || window._lastLoggedZoom !== e) && (console.log(`[RTI Viewer] Zoom: ${e} | Projected Tile: ${a.toFixed(1)}px | Active Meshes: ${p.value}`), window._lastLoggedZoom = e);
			}
			let o = w.value.getVisibleNodes(n, a), s = new Set(o.map((e) => e.node.id)), c = o.filter((e) => !E.has(e.node.id));
			if (c.length > 0) {
				let e = c.map((e) => `[ID:${e.node.id} L:${e.node.level}]`).join(", ");
				console.log(`[RTI Viewer] Loading ${c.length} new tiles: ${e}`);
			}
			if (T.size === 0) for (let [e, t] of E.entries()) s.has(e) || (y.value.remove(t), t.geometry && t.geometry.dispose(), t.material && t.material.dispose(), E.delete(e));
			for (let { node: e, worldBox: t } of o) if (!E.has(e.id)) j(e, t);
			else {
				let t = E.get(e.id);
				t && t.material.uniforms && (t.material.uniforms.uLightDir.value.copy(v.value), t.material.uniforms.uRenderMode && (t.material.uniforms.uRenderMode.value = h.value), t.material.uniforms.uSpecularExponent && (t.material.uniforms.uSpecularExponent.value = g.value));
			}
			p.value = E.size;
		}, j = (e, n) => {
			let r = n.maxX - n.minX, i = n.maxY - n.minY, a = n.minX + r / 2, o = n.minY + i / 2, s = new sf(r, i);
			T.add(e.id);
			let c = new Ud(s, new jd({
				color: 3355443,
				wireframe: !0
			}));
			c.position.set(a, o, e.level * .1), y.value.add(c), E.set(e.id, c);
			let l = (t) => {
				let n = new zl((w.value.imgBox.minX - .5) * w.value.maxSize, (w.value.imgBox.maxX - .5) * w.value.maxSize, (w.value.imgBox.minY - .5) * w.value.maxSize, (w.value.imgBox.maxY - .5) * w.value.maxSize), a;
				a = _.value.type === 5 ? O_(t, v.value, _.value.weights, n) : _.value.type === 1 ? E_(t, v.value, _.value.bias, _.value.scale, n) : _.value.type === 2 ? D_(t, v.value, _.value.bias, _.value.scale, n) : new jd({ map: t[0] }), a.uniforms && (a.uniforms.uRenderMode && (a.uniforms.uRenderMode.value = h.value), a.uniforms.uSpecularExponent && (a.uniforms.uSpecularExponent.value = g.value)), c.material = a, c.geometry = new sf(r, i), T.delete(e.id);
			}, u = `${t.url}_${e.id}`;
			if (k.has(u)) {
				let e = k.get(u);
				k.delete(u), k.set(u, e), l(e);
				return;
			}
			let d = (e) => {
				if (k.set(u, e), k.size > Eb) {
					let e = k.keys().next().value, t = k.get(e);
					t && t.forEach((e) => e.dispose()), k.delete(e);
				}
				l(e);
			};
			if (O.value) {
				O.value.loadTileTextures(e, w.value.nLevels, _.value.tileSize).then((t) => {
					if (!t || t.length === 0) {
						T.delete(e.id);
						return;
					}
					d(t);
				}).catch((t) => {
					console.error(`[TiffTileLoader] Error loading tile for node ${e.id}:`, t), T.delete(e.id);
				});
				return;
			}
			let f = [], p = 0;
			for (let n = 0; n < _.value.layerCount; n++) {
				let r = `${t.url}/${e.id}_${n + 1}.jpg`;
				console.log(`[RTI Viewer] Requesting image: ${r}`), D.load(r, (e) => {
					f[n] = e, e.colorSpace = "", p++, p === _.value.layerCount && d(f);
				}, void 0, (t) => {
					console.error(`Error loading tile ${e.id}_${n + 1}:`, t), T.delete(e.id);
				});
			}
		}, ne = () => {
			if (!r.value || !b.value || !S.value) return;
			let e = r.value.clientWidth, t = r.value.clientHeight, n = e / t, i = Math.max(_.value.width, _.value.height) / 2;
			b.value.left = -i * n, b.value.right = i * n, b.value.top = i, b.value.bottom = -i, b.value.updateProjectionMatrix(), S.value.setSize(e, t);
		}, M = (e) => {
			m.value = e, x.value && (x.value.enabled = e === "pan"), i.value && (i.value.style.touchAction = e === "light" ? "none" : "auto");
		}, N = (e) => {
			h.value = e;
			for (let t of E.values()) t && t.material.uniforms && t.material.uniforms.uRenderMode && (t.material.uniforms.uRenderMode.value = e);
		}, re = () => {
			for (let e of E.values()) e && e.material.uniforms && e.material.uniforms.uSpecularExponent && (e.material.uniforms.uSpecularExponent.value = g.value);
		}, ie = () => {
			let e = window.location.hash.slice(1);
			if (!e) return;
			let t = new URLSearchParams(e);
			if (t.has("lx") && t.has("ly")) {
				let e = parseFloat(t.get("lx")), n = parseFloat(t.get("ly")), r = e * e + n * n, i = r <= 1 ? Math.sqrt(1 - r) : 0;
				v.value.set(e, n, i).normalize();
			}
			t.has("mode") && (h.value = parseInt(t.get("mode")));
		}, ae = () => {
			let e = !1, t = !1;
			i.value.addEventListener("pointerdown", (t) => {
				m.value === "light" && (e = !0, i.value.setPointerCapture(t.pointerId), n(t));
			}), i.value.addEventListener("pointermove", (t) => {
				m.value === "light" && e && n(t);
			}), i.value.addEventListener("pointerup", (t) => {
				e &&= (i.value.releasePointerCapture(t.pointerId), !1);
			}), i.value.addEventListener("pointercancel", (t) => {
				e &&= (i.value.releasePointerCapture(t.pointerId), !1);
			});
			let n = (e) => {
				let t = i.value.getBoundingClientRect(), n = Math.min(t.width, t.height), r = t.width / 2, a = t.height / 2;
				oe((e.clientX - t.left - r) / n + .5, (e.clientY - t.top - a) / n + .5);
			};
			if (a.value) {
				a.value.addEventListener("pointerdown", (n) => {
					t = !0, a.value.setPointerCapture(n.pointerId), e(n);
				}), a.value.addEventListener("pointermove", (n) => {
					t && e(n);
				}), a.value.addEventListener("pointerup", (e) => {
					t &&= (a.value.releasePointerCapture(e.pointerId), !1);
				}), a.value.addEventListener("pointercancel", (e) => {
					t &&= (a.value.releasePointerCapture(e.pointerId), !1);
				});
				let e = (e) => {
					let t = a.value.getBoundingClientRect(), n = (e.clientX - t.left) / t.width, r = (e.clientY - t.top) / t.height;
					n = Math.max(0, Math.min(1, n)), r = Math.max(0, Math.min(1, r)), oe(n, r);
				};
			}
			i.value && (i.value.style.touchAction = m.value === "light" ? "none" : "auto");
		}, oe = (e, t) => {
			let n = e * 2 - 1, r = -(t * 2 - 1), i = n * n + r * r, a = .95, o = a * a;
			if (i > o) {
				let e = Math.sqrt(i);
				n = n / e * a, r = r / e * a, i = o;
			}
			let s = Math.sqrt(1 - i);
			v.value.set(n, r, s).normalize();
		}, P = () => {
			if (!S.value) return;
			S.value.render(y.value, b.value);
			let e = S.value.domElement.toDataURL("image/png"), t = document.createElement("a");
			t.href = e, t.download = `rti_export_${Date.now()}.png`, t.click();
		}, se = () => {
			if (!b.value) return;
			let e = new URLSearchParams();
			e.set("cx", b.value.position.x.toFixed(4)), e.set("cy", b.value.position.y.toFixed(4)), e.set("z", b.value.zoom.toFixed(4)), e.set("lx", v.value.x.toFixed(4)), e.set("ly", v.value.y.toFixed(4)), e.set("mode", h.value), u.value = `${t.shareUrl || `${window.location.origin}${window.location.pathname}`}#${e.toString()}`, d.value = !1, l.value = !0;
		}, F = async () => {
			try {
				await navigator.clipboard.writeText(u.value), d.value = !0, setTimeout(() => {
					d.value = !1;
				}, 2e3);
			} catch (e) {
				console.error("Failed to copy: ", e), alert("Failed to copy link. Please select the text and copy it manually.");
			}
		}, ce = () => {
			document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : n.value.requestFullscreen && n.value.requestFullscreen().catch((e) => {
				console.warn(`Error attempting to enable fullscreen: ${e.message}`);
			});
		};
		return (e, t) => (Zi(), na("div", {
			ref_key: "rootWrapper",
			ref: n,
			class: "relative flex flex-row w-full h-full min-h-[600px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700"
		}, [
			U("div", pb, [
				U("button", {
					onClick: t[0] ||= (e) => M("pan"),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", m.value === "pan" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(g_), { class: "w-5 h-5" }), t[15] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Pan & Zoom"), U("span", { class: "text-white/60" }, "Navigate the image")], -1)], 2),
				U("button", {
					onClick: t[1] ||= (e) => M("light"),
					class: _e(["group relative p-3 rounded-xl transition-all", m.value === "light" ? "bg-yellow-500 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(y_), { class: "w-5 h-5" }), t[16] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Light Direction"), U("span", { class: "text-white/60" }, "Move the light source")], -1)], 2),
				t[29] ||= U("div", { class: "w-8 h-px bg-slate-700 my-4" }, null, -1),
				U("button", {
					onClick: t[2] ||= (e) => N(0),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 0 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(__), { class: "w-5 h-5" }), t[17] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Default Mode"), U("span", { class: "text-white/60" }, "Standard diffuse rendering")], -1)], 2),
				U("button", {
					onClick: t[3] ||= (e) => N(1),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 1 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(f_), { class: "w-5 h-5" }), t[18] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Glossy Mode"), U("span", { class: "text-white/60" }, "Enhance surface scratches")], -1)], 2),
				U("button", {
					onClick: t[4] ||= (e) => N(2),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 2 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(d_), { class: "w-5 h-5" }), t[19] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Normals Mode"), U("span", { class: "text-white/60" }, "View structural geometry")], -1)], 2),
				U("button", {
					onClick: t[5] ||= (e) => N(3),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 3 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(x_), { class: "w-5 h-5" }), t[20] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Slope Heatmap"), U("span", { class: "text-white/60" }, "Visualize surface steepness")], -1)], 2),
				U("button", {
					onClick: t[6] ||= (e) => N(4),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 4 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(w_), { class: "w-5 h-5" }), t[21] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Dual Light"), U("span", { class: "text-white/60" }, "Red & Blue opposing lights")], -1)], 2),
				_.value?.type === 5 ? (Zi(), na("button", {
					key: 0,
					onClick: t[7] ||= (e) => N(5),
					class: _e(["group relative p-3 rounded-xl transition-all mb-2", h.value === 5 ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:bg-white/10 hover:text-white"])
				}, [ca(Yt(d_), { class: "w-5 h-5" }), t[22] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Latent Map"), U("span", { class: "text-white/60" }, "View raw learned latent map")], -1)], 2)) : pa("", !0),
				h.value === 1 ? (Zi(), na("div", mb, [jn(U("input", {
					type: "range",
					min: "2",
					max: "50",
					"onUpdate:modelValue": t[8] ||= (e) => g.value = e,
					onInput: re,
					class: "w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500",
					style: {
						"writing-mode": "bt-lr",
						transform: "rotate(270deg)",
						width: "60px",
						"margin-top": "30px",
						"margin-bottom": "30px"
					}
				}, null, 544), [[
					es,
					g.value,
					void 0,
					{ number: !0 }
				]]), t[23] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Specular Intensity"), U("span", { class: "text-white/60" }, "Adjust surface wetness")], -1)])) : pa("", !0),
				U("div", hb, [
					t[28] ||= U("div", { class: "w-8 h-px bg-slate-700 my-4" }, null, -1),
					U("button", {
						onClick: ce,
						class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
					}, [(Zi(), ra(kr(f.value ? Yt(C_) : Yt(S_)), { class: "w-5 h-5" })), U("div", gb, [U("span", _b, Ce(f.value ? "Exit Fullscreen" : "Enter Fullscreen"), 1), t[24] ||= U("span", { class: "text-white/60" }, "Maximize workspace", -1)])]),
					U("button", {
						onClick: P,
						class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
					}, [ca(Yt(h_), { class: "w-5 h-5" }), t[25] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Download Render"), U("span", { class: "text-white/60" }, "Save current view as PNG")], -1)]),
					U("button", {
						onClick: se,
						class: "group relative p-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all mb-2"
					}, [ca(Yt(b_), { class: "w-5 h-5" }), t[26] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "Copy Link"), U("span", { class: "text-white/60" }, "Share view with exact angles")], -1)]),
					U("button", {
						onClick: t[9] ||= (e) => c.value = !c.value,
						class: _e(["group relative p-3 rounded-xl transition-all", c.value ? "bg-white/20 text-white shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"])
					}, [ca(Yt(v_), { class: "w-5 h-5" }), t[27] ||= U("div", { class: "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-50 shadow-2xl flex flex-col items-start text-left" }, [U("span", { class: "text-white font-bold mb-0.5" }, "About"), U("span", { class: "text-white/60" }, "Project credits")], -1)], 2)
				])
			]),
			ca(ro, {
				"enter-active-class": "transition duration-200 ease-out",
				"enter-from-class": "opacity-0 scale-95",
				"enter-to-class": "opacity-100 scale-100",
				"leave-active-class": "transition duration-150 ease-in",
				"leave-from-class": "opacity-100 scale-100",
				"leave-to-class": "opacity-0 scale-95"
			}, {
				default: An(() => [c.value ? (Zi(), na("div", vb, [U("div", {
					class: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
					onClick: t[10] ||= (e) => c.value = !1
				}), U("div", yb, [
					U("button", {
						onClick: t[11] ||= (e) => c.value = !1,
						class: "absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
					}, [...t[30] ||= [U("svg", {
						class: "w-6 h-6",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor"
					}, [U("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M6 18L18 6M6 6l12 12"
					})], -1)]]),
					t[31] ||= U("div", { class: "flex items-center space-x-3 mb-6" }, [U("h2", { class: "text-2xl font-bold text-white" }, "About RTI Viewer"), U("span", { class: "px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30" }, "v1.0.0")], -1),
					t[32] ||= U("div", { class: "space-y-4 mb-8" }, [U("div", null, [U("h3", { class: "text-white font-semibold mb-1" }, "Technology"), U("p", { class: "text-sm text-slate-400" }, "Powered by Vue 3 and Three.js. This viewer utilizes custom WebGL shaders to reconstruct reflectance fields (PTM/HSH) in real-time directly on the GPU.")]), U("div", null, [U("h3", { class: "text-white font-semibold mb-1" }, "Performance"), U("p", { class: "text-sm text-slate-400" }, "Large RTI datasets are seamlessly loaded using an intelligent Frustum-Culling Quadtree, ensuring only visible tiles are kept in VRAM.")])], -1),
					t[33] ||= U("div", { class: "pt-6 border-t border-slate-700 text-center" }, [U("div", { class: "text-sm font-medium tracking-wide" }, [
						fa(" built with "),
						U("span", { class: "text-red-500/90 text-[16px] mx-1" }, "❤️"),
						fa(" by "),
						U("a", {
							href: "https://github.com/mfindeisen",
							target: "_blank",
							rel: "noopener noreferrer",
							class: "text-blue-400 hover:text-blue-300 hover:underline transition-colors"
						}, "Matthias Findeisen")
					])], -1)
				])])) : pa("", !0)]),
				_: 1
			}),
			ca(ro, {
				"enter-active-class": "transition duration-200 ease-out",
				"enter-from-class": "opacity-0 scale-95",
				"enter-to-class": "opacity-100 scale-100",
				"leave-active-class": "transition duration-150 ease-in",
				"leave-from-class": "opacity-100 scale-100",
				"leave-to-class": "opacity-0 scale-95"
			}, {
				default: An(() => [l.value ? (Zi(), na("div", bb, [U("div", {
					class: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
					onClick: t[12] ||= (e) => l.value = !1
				}), U("div", xb, [
					U("button", {
						onClick: t[13] ||= (e) => l.value = !1,
						class: "absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
					}, [...t[34] ||= [U("svg", {
						class: "w-6 h-6",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor"
					}, [U("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"stroke-width": "2",
						d: "M6 18L18 6M6 6l12 12"
					})], -1)]]),
					t[35] ||= U("h2", { class: "text-2xl font-bold text-white mb-2" }, "Share this View", -1),
					t[36] ||= U("p", { class: "text-sm text-slate-400 mb-6" }, "This link contains the exact camera angle, zoom level, and light direction you are currently viewing.", -1),
					U("div", Sb, [U("input", {
						type: "text",
						readonly: "",
						value: u.value,
						class: "flex-1 bg-transparent text-white px-3 py-2 outline-none text-sm font-mono selection:bg-blue-500/30",
						onFocus: t[14] ||= (e) => e.target.select()
					}, null, 40, Cb), U("button", {
						onClick: F,
						class: _e(["px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2", d.value ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-600 hover:bg-blue-500 text-white"])
					}, [(Zi(), ra(kr(d.value ? Yt(p_) : Yt(m_)), { class: "w-4 h-4" })), U("span", null, Ce(d.value ? "Copied" : "Copy"), 1)], 2)])
				])])) : pa("", !0)]),
				_: 1
			}),
			U("div", {
				class: "flex-1 relative overflow-hidden",
				ref_key: "containerWrapper",
				ref: r
			}, [
				U("div", {
					ref_key: "container",
					ref: i,
					class: "absolute inset-0"
				}, null, 512),
				o.value ? (Zi(), na("div", wb, [...t[37] ||= [U("div", { class: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" }, null, -1), U("p", { class: "text-white font-medium" }, "Loading RTI Data...", -1)]])) : pa("", !0),
				U("div", {
					ref_key: "compassRef",
					ref: a,
					class: "absolute bottom-6 left-6 w-24 h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center z-20 shadow-xl overflow-hidden cursor-crosshair touch-none"
				}, [
					t[38] ||= U("div", { class: "absolute inset-0 rounded-full border-2 border-white/5 m-2 pointer-events-none" }, null, -1),
					t[39] ||= U("div", { class: "absolute w-full h-px bg-white/10 pointer-events-none" }, null, -1),
					t[40] ||= U("div", { class: "absolute h-full w-px bg-white/10 pointer-events-none" }, null, -1),
					U("div", {
						class: "absolute top-1/2 left-1/2 -mt-1.5 -ml-1.5 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-transform duration-75 pointer-events-none",
						style: fe({ transform: `translate(${v.value.x * (40 / .95)}px, ${-v.value.y * (40 / .95)}px)` })
					}, null, 4)
				], 512)
			], 512)
		], 512));
	}
}, Ob = class extends HTMLElement {
	connectedCallback() {
		let e = this.getAttribute("url"), t = this.getAttribute("share-url") || "";
		this.mountPoint = document.createElement("div"), this.mountPoint.style.width = "100%", this.mountPoint.style.height = "100%", this.appendChild(this.mountPoint), this.app = is(Db, {
			url: e,
			shareUrl: t
		}), this.app.mount(this.mountPoint);
	}
	disconnectedCallback() {
		this.app && this.app.unmount();
	}
};
customElements.get("modern-rti-viewer") || customElements.define("modern-rti-viewer", Ob);
//#endregion
export { Db as RtiViewer };
