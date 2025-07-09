import {describe, expect, test} from 'vitest';
import HexletCode from "../src";
import {FixtureTemplate} from "../__fixtures__/fixtures";
import fs from 'fs'
import path from 'path'
import {mainTrim} from "../src/utils";

describe('HexletCode tests', () => {
    test('get clear form without options', () => {
        const form = HexletCode.formFor({}, {}, () => {
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-clear.html'), 'utf8')

        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get clear form with options', () => {
        const form = HexletCode.formFor({}, {url: '/users'}, () => {
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-with-action.html'), 'utf8')

        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get form with inputs', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('name', {class: 'user-input'});
            f.input('job');
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-simple-inputs.html'), 'utf8')

        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get form with textarea', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('job', {as: 'textarea'});
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-textarea.html'), 'utf8')

        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get form with custom textarea', () => {
        const form = HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('job', {as: 'textarea', rows: 50, cols: 50});
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-custom-textarea.html'), 'utf8')
        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get error', () => {
        const errorFunc = () => HexletCode.formFor(FixtureTemplate, {}, (f) => {
            f.input('name');
            f.input('job', {as: 'textarea'});
            f.input('age');
        })
        expect(() => errorFunc()).toThrowError('Field \'age\' does not exist in the template')
    })

    test('get form with submit', () => {
        const form = HexletCode.formFor(FixtureTemplate, {method: 'post'}, (f) => {
            f.input('name');
            f.input('job', {as: 'textarea'});
            f.submit();
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-with-submit.html'), 'utf8')
        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })

    test('get form with custom submit', () => {
        const form = HexletCode.formFor(FixtureTemplate, {method: 'post'}, (f) => {
            f.input('name');
            f.input('job', {as: 'textarea'});
            f.submit('Wow');
        })

        const fixture = fs.readFileSync(path.resolve(__dirname, '../__fixtures__/form-with-custom-submit.html'), 'utf8')
        expect(mainTrim(form)).toEqual(mainTrim(fixture))
    })
})
