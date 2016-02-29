# Ember validation

Yet another one ember validation.


## Введение


### Знакомство

Чтобы включить валидацию на объекте нужно:

* Подключить специальный миксин `ValidationMixin` (или наследника, например `ValidationMixin`)
* Описать схему валидации в хеше `validationScheme`

Миксин `ValidationMixin` при инициализации объекта по схеме валидации создает соотвествующие валидаторы и добавляет методы валидации в класс (основные методы `validate` и `validateAttribute`). При вызове метода `validate` вызываются все валидаторы по очереди, в соответствии с `validationProperties` (см. ниже).

При вызове каждому валидатору предоставляется 2 аргумента: `имя_аттрибута`, `контекст`. Валидаторы возвращают Promise объекты, которые укладываются в общую кучу таких объектов в объекте, реализующем миксин.
Все промисы на reject содержат ошибку. При неуспешном выполнении хотя бы одного промиса объект наполняется ошибками, которые вернули валидаторы и становится невалидным.

Коллекция ошибок обсервит количество своих эелементов и отстреливает события `invalid` и `valid`, которые переключают состояние объектов, к которому он принадлежит, делая его валидным или инвалидным.

#### Хеш validationScheme (Схема валидации)

Хеш, описывающий правила валидации объекта. По нему создаются валидаторы, которые и реализуют валидацию по полям. Структура хеша `validationScheme`:

```es6
validationScheme: {
  имя_аттрибута: {
    options: validationProperties,
    validators: {
      имя_валидатора: validationProperties
    }
  }
}
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
        required: true,
        number: { min: 18, max: 100 }
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
