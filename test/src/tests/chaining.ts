'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';


var MSG = "Suit chaining.";

describe(MSG,function(){
    var mod = require("mocha-suit");

    var setMethods = function(s: any) {
        s.before(function(){});
        s.it("",function(){});
        s.xit("",function(){});
        s.that("",function(){});
        s.xthat("",function(){});
        s.after(function(){});
    };

    before(function(){
        this.suit = mod();
        setMethods(this.suit);
        this.helperSuit = mod();
        setMethods(this.helperSuit);
        this.targetSuit = this.suit.extend();
        setMethods(this.targetSuit);
        this.suit.with(this.helperSuit);
        this.targetSuit.with(this.helperSuit);
        this.targetSuit();
    });

    before(RunSpyMethods);

    it("it should called from target it and that && base that",function(){
        // that from suit, that from helperSuit
        // that from targetSuit, that from targetHelperSuit
        // it from targetSuit, it from targetHelperSuit
        TestingMethods.it.calledTimes().should.be.eql(6);
    });

    it("xit should called from target xit and xthat && base xthat",function(){
        // xthat from suit, xthat from helperSuit
        // xthat from targetSuit, xthat from targetHelperSuit
        // xit from targetSuit, xit from targetHelperSuit
        TestingMethods.it.calledTimes().should.be.eql(6);
    });

    after(ResetSpyMethods);
});
