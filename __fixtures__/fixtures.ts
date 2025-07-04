export const FixtureTemplate = {name: 'rob', job: 'hexlet', gender: 'm'};

export const FixtureFormClear = '<form action="#" method="post"></form>'

export const FixtureFormWithAction = '<form action="/users" method="post"></form>'

export const FixtureFormWithSimpleInputs = `<form action="#" method="post">
    <input name="name" type="text" class="user-input" value="rob">
    <input name="job" type="text" value="hexlet">
</form>`

export const FixtureFormWithTextarea = `<form action="#" method="post">
    <textarea name="job" cols="20" rows="40" as="textarea">hexlet</textarea>
</form>`

export const FixtureFormWithCustomTextarea = `<form action="#" method="post">
    <textarea name="job" cols="50" rows="50" as="textarea">hexlet</textarea>
</form>`
