import {describe, expect, test} from 'vitest';
import HexletCode, {Tag} from "../src";

describe('class Tag tests', () => {
    test('get simple tag', () => {
        expect(new Tag('br').toString()).toBe('<br>')
    })

    test('get simple tag with options', () => {
        expect(new Tag('img', { src: 'source/img.jpg', alt: 'img'}).toString()).toBe('<img src="source/img.jpg" alt="img">')
    })

    test('get closed tag', () => {
        expect(new Tag('label').toString()).toBe('<label></label>')
    })

    test('get closed tag with content', () => {
        expect(new Tag('label', {}, 'inner').toString()).toBe('<label>inner</label>')
    })

    test('get closed tag with options', () => {
        expect(new Tag('label', { for: 'input' }).toString()).toBe('<label for="input"></label>')
    })

    test('get closed tag with content and options', () => {
        expect(new Tag('label', { for: 'input' }, 'inner').toString()).toBe('<label for="input">inner</label>')
    })

})

describe('HexletCode tests', () => {
    const template = { name: 'rob', job: 'hexlet', gender: 'm' };

    test('get form without options', () => {
        const form = HexletCode.formFor(template, {}, (f) => {})
        expect(form).toEqual('<form action="#" method="post"></form>')
    })

    test('get form with options', () => {
        const form = HexletCode.formFor(template, {url: '/users'}, (f) => {})
        expect(form).toEqual('<form action="/users" method="post"></form>')
    })
})
