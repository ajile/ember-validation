# Ember validation

Yet another one ember validation.


## Введение


### Знакомство

Чтобы включить валидацию на объекте нужно:

* Подключить специальный миксин `ValidationMixin` (или наследника, например `ModelValidationMixin`)
* Описать схему валидации в хеше `validationScheme`

Миксин `ValidationMixin` при инициализации объекта по схеме валидации создает медиаторы и валидаторы к ним, также добавляет методы валидации в объект (основные методы это `validate` и `validateAttribute`). При вызове метода `validate` вызываются все медиаторы, которые дергают валидаторы, передавая в них требуемые для проверки агрументы.

Валидаторы вызываются с 2-мя аргумента: `имя_аттрибута`, `контекст`. Они должны проверять значение аттрибута, взятое из контекста и возвращать Promise.

Промисы на reject должны содержать сообщение об ошибке (или ключ ошибки). При неуспешном выполнении хотя бы одного валидатора, объект наполняется ошибками и объект становится инвалидным.

Объект `Errors` на изменение кол-ва своих элементов отстреливает события `invalid` и `valid`, которые переключают состояние объектов, к которым он принадлежит.

#### Хеш validationScheme (Схема валидации)

Основной хеш, содержащий правила валидации. По нему создаются медиаторы и валидаторы, которые и реализуют проверку значений на полях.

Структура хеша `validationScheme`:

```es6
validationScheme: {
  ATTRIBUTE_NAME: {
    options: ATTRIBUTE_OPTIONS,
    validators: [
      { name: VALIDATOR_NAME, options: VALIDATOR_OPTIONS }
    ]
  }
}
```

* ATTRIBUTE_NAME - имя аттрибута обеъекта, оно будет передаваться в валидатор вместе с контектом.
* MEDIATOR_OPTIONS - хеш, который миксуется в медиатор аттрибута
* VALIDATOR_NAME - имя валидатора, по нему lookuping класс валидатора в `validators:VALIDATOR_NAME`
* VALIDATOR_OPTIONS - хеш, который миксуется в медиатор валидатора

Структура создаваемая по схеме:

```es6
Ember.Object <--- ValidationMixin
    | (1..*)
    AttributeMediator <--- ATTRIBUTE_OPTIONS
        | (*..*)
        ValidatorMediator <--- VALIDATOR_OPTIONS
            | (1..1)
            Validator
```


#### Хеш validationProperties (Параметры валидации)

```es6

validationProperties = {

  // Условия при которых валидация поля включена. Можно указать computed и в таком случае,
  // при изменении связанного поля будет происходить перевалидация поля.
  condition: Ember.computed,

  // Слушатель, который реагирует на изменения связанного аттрибута. Он
  // перезапускает валидацию.
  observes: Ember.observer

}
```


### Валидаторы


#### Список валидаторов и их validationProperties

[WIP]


#### Написание собственных валидаторов

[WIP]


#### Кастомизация существующих собственных валидаторов

[WIP]


#### Использование валидаторов отдельно от системы вализации

[WIP]


## Использование

### Валидация на уровне модели

Модель должна расширяться миксином `ModelValidationMixin`. Валидаторы можно указать несколькими способами:

* У каждого аттрибута прописать имя валидатора и параметры валидации
* Отдельным хешом `validationScheme` (см. выше)

Миксин валидации создает валидаторы на поля модели, а также перекрывает метод save. Вставляет
проверку валидности модели перед вызовом `DS#save`. Эту опцию можно отключить, передав в метод save
дополнительный хеш { validate: false }.

```es6
import DS from 'ember-data';
import ModelValidationMixin from 'ember-validation/mixins/validation';

const { computed } = Ember;

const GENDERS = {
  MALE: "male",
  FEMALE: "female",
}

var User = DS.Model.extend(ModelValidationMixin, {

  validationScheme: {
    age: {
      options: {
        condition: computed("ageRestricted")
      },
      validators: {
        { name: "required", options: { message: "field_is_required" } },
        { name: "number", options: { min: 18, max: 100, message: "age_is_wrong" } }
      }
    }
  },

  ageRestricted: computed.equal("gender", GENDERS.FEMALE)

  name: DS.attr('string', { validatorType: "string", validatorOptions: validationProperties }),

});
```

### Валидация на уровне представления

#### Простая форма (валидация модели с проксированием ошибок)

[WIP]

```hbs
{{!-- Main form begin --}}
  {{#form model=user as |userForm|}}

    {{input value=user.name validatePath="name"}}
    {{error-list errors=user.errors.name}}

    {{input value=user.age validatePath="age"}}
    {{error-list errors=user.errors.age}}

  {{/form}}
{{!-- Main form end --}}
```

#### Форма с расширением валидации модели

[WIP]

#### Вложенные формы и кастомные компоненты

[WIP]

```hbs
{{!-- Main form begin --}}
  {{#form model=employee as |mainForm|}}

    {{!-- Fields goes below --}}
    {{input value=employee.name validatePath="name"}}
    {{input value=employee.age validatePath="age"}}


    {{!-- Company form begin --}}
      {{#form-company model=employee.company as |companyForm| tagName="div"}}

        {{input value=companyForm.model.name validatePath="name"}}
        {{error-list errors=companyForm.errors.name}}

        {{input value=companyForm.model.inn validatePath="inn"}}
        {{error-list errors=companyForm.errors.inn}}

      {{/form-company}}
    {{!-- Company form end --}}


  {{/form}}
{{!-- Main form end --}}
```

#### Кастомизация валидации модели в использовании сложных компонентов

[WIP]


### Валидация на уровне контроллера

[WIP]


### Обработка серверных ошибок
