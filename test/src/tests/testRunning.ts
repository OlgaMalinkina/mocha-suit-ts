'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

import sinon = require("sinon");

var MSG = "Test running.";

describe(MSG,function(){
    var mod = require("mocha-suit");

    var createSuit = function(){
        before(function() {
            this.suit = mod();
            this.spy = sinon.spy();
            this.suit.it("", this.spy);
        });
    };

    describe("With new",function(){
        createSuit();

        before(function(){
            new this.suit();
        });

        before(RunSpyMethods);

        it("spy should be called",function(){
            this.spy.called.should.be.true();
        });

        after(ResetSpyMethods);
    });

    describe("With simple call",function(){
        createSuit();

        before(function(){
            this.suit();
        });

        before(RunSpyMethods);

        it("spy should be called",function(){
            this.spy.called.should.be.true();
        });

        after(ResetSpyMethods);
    });

    describe("With simple call under array of context objects",function(){
        var TIMES = 10;

        createSuit();

        before(function(){
            var ctxSet = [];
            for(var i = 0; i < TIMES; i++) {
                ctxSet.push({});
            }
            this.suit(ctxSet);
        });

        before(RunSpyMethods);

        it("spy should be called",function(){
            this.spy.called.should.be.true();
            TestingMethods.it.calledTimes().should.be.eql(TIMES);
        });

        after(ResetSpyMethods);
    });

    describe("With simple call with testSet",function(){
        var TIMES = 10;

        createSuit();

        before(function(){
            var ctxSet: any = {};
            for(var i = 0; i < TIMES; i++) {
                ctxSet[i]  = {};
            }
            ctxSet.testSet = true;
            this.suit(ctxSet);
        });

        before(RunSpyMethods);

        it("spy should be called",function(){
            this.spy.called.should.be.true();

            try {
                TestingMethods.it.calledTimes().should.be.eql(TIMES);
            } catch(e) {
                console.log(TestingMethods.it);
                throw e;
            }

        });

        after(ResetSpyMethods);
    });
});
