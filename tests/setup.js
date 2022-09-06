import * as Vue from 'vue'
import * as VueCompilerDOM from '@vue/compiler-dom'
import React from 'react'
global.Vue = Vue
global.VueCompilerDOM = VueCompilerDOM
global.React = React

if (!process.env.TEST_TEMP) {
  // drop console.log and console.warn
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
}

