'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

var MSG = "Context generation.";

describe(MSG,function(){
    var mod = require("mocha-suit");

    describe("With generator call.",function(){
        before(function(){
            this.testCtx = {
                testKey: true
            };
            this.suit = mod("some",this.testCtx);

            var self = this;

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit();
        });

        before(RunSpyMethods);

        it("testKey should exists",function() {
            this.retCtx.should.be.eql(this.testCtx);
        });

        after(ResetSpyMethods);
    });

    describe("With extend call.",function(){
        before(function(){
            this.testCtx = {
                testKey: true
            };
            this.suit = mod("some").extend("",this.testCtx);

            var self = this;

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit();
        });

        before(RunSpyMethods);

        it("testKey should exists",function() {
            this.retCtx.should.be.eql(this.testCtx);
        });

        after(ResetSpyMethods);
    });

    describe("With test run call.",function(){
        before(function(){
            this.testCtx = {
                testKey: true
            };
            this.suit = mod("some");

            var self = this;

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit(this.testCtx);
        });

        before(RunSpyMethods);

        it("testKey should exists",function() {
            this.retCtx.should.be.eql(this.testCtx);
        });

        after(ResetSpyMethods);
    });

    describe("Extend should rewrite lower extend.",function(){
        before(function(){
            this.suit = mod("some").extend("",{
                testKey: 1
            }).extend("",{
                testKey: 2
            });

            var self = this;

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit();
        });

        before(RunSpyMethods);

        it("testKey should have last set value",function() {
            this.retCtx.should.have.property("testKey",2);
        });

        after(ResetSpyMethods);
    });

    describe("Test call ctx should rewrite value set within extend call.",function(){
        before(function(){
            this.suit = mod("some").extend("",{
                testKey: 1
            });

            var self = this;

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit({
                testKey: 2
            });
        });

        before(RunSpyMethods);

        it("testKey should have last set value",function() {
            this.retCtx.should.have.property("testKey",2);
        });

        after(ResetSpyMethods);
    });

    describe("Any before method call with ctx changing should rewrite passed ctx.",function(){
        before(function(){
            this.suit = mod("some");

            var self = this;

            this.suit.before(function(){
                this.suit.testKey = 2;
            });

            this.suit.it("",function(){
                self.retCtx = this.suit;
            });

            this.suit({
                testKey: 1
            });
        });

        before(RunSpyMethods);

        it("testKey should have last set value",function() {
            this.retCtx.should.have.property("testKey",2);
        });

        after(ResetSpyMethods);
    });
});
