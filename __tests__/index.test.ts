import {describe, expect, test} from 'vitest';
import HexletCode, {Tag} from "../src";
import {FixtureTemplate} from "../__fixtures__/fixtures";
import fs from 'fs'
import path from 'path'

describe('class Tag tests', () => {
    test('get simple tag', () => {
        expect(new Tag('br').toString()).toBe('<br>')
    })

    test('get simple tag with options', () => {
        expect(new Tag('img', {
            src: 'source/img.jpg',
            alt: 'img'
        }).toString()).toBe('<img src="source/img.jpg" alt="img">')
    })

    test('get closed tag', () => {
        expect(new Tag('label').toString()).toBe('<label></label>')
    })

    test('get closed tag with content', () => {
        expect(new Tag('label', {}, 'inner').toString()).toBe('<label>inner</label>')
    })

    test('get closed tag with options', () => {
        expect(new Tag('label', {for: 'input'}).toString()).toBe('<label for="input"></label>')
    })

    test('get closed tag with content and options', () => {
        expect(new Tag('label', {for: 'input'}, 'inner').toString()).toBe('<label for="input">inner</label>')
    })

})

describe('HexletCode tests', () => {
    test('get clear form without options', () => {
        const form = HexletCode.formFor({}, {}, () => {
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-clear.html'), 'utf8')

        expect(form.trim()).toEqual(fixture.trim())
    })

    test('get clear form with options', () => {
        const form = HexletCode.formFor({}, {url: '/users'}, () => {
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-with-action.html'), 'utf8')

        expect(form.trim()).toEqual(fixture.trim())
    })

    test('get form with inputs', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('name', {class: 'user-input'});
            f.input('job');
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-simple-inputs.html'), 'utf8')

        expect(form.trim()).toEqual(fixture.trim())
    })

    test('get form with textarea', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('job', {as: 'textarea'});
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-textarea.html'), 'utf8')

        expect(form.trim()).toEqual(fixture.trim())
    })

    test('get form with custom textarea', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('job', {as: 'textarea', rows: 50, cols: 50});
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-custom-textarea.html'), 'utf8')

        expect(form.trim()).toEqual(fixture.trim())
    })

    test('get error', () => {
        const errorFunc = () => HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('name');
            f.input('job', {as: 'textarea'});
            f.input('age');
        })
        expect(() => errorFunc()).toThrowError('Field \'age\' does not exist in the template')
    })
})
