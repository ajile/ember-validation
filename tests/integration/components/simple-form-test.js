import { moduleForComponent, test } from 'ember-qunit';
import moduleForAcceptance from '../../helpers/module-for-acceptance';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/simple-form';

moduleForAcceptance('Acceptance | Page | simple form');

test('it renders', function(assert) {

  page.visit().submit();

  // page.last_name.focus()

  // andThen(() => {
  //   page.first_name.focus()

  //   andThen(() => {
  //     console.log(page.errors)
  //   })

  // })
  // andThen(() => {
  //   page.first_name.focus()

  //   page.last_name.focus()
  // })

  andThen(() => {
    console.log(page.errors)
    page.last_name.click()//.focus();
    console.log('------------------------------')
  })


  andThen(() => {

    assert.equal(page.errorsCount, 4, '4 errors')
    console.log(page.errors)
    console.log('------------------------------')
    page.phone.click()//.focus();
    // page.phone.fillIn('123')
  });

  // andThen(() => {
  //   // debugger
  //   assert.equal(page.errorsCount, 3, '3 errors');
  //   console.log(page.errors)
  //   console.log(find('#first_name input').is(':focus'))

  //   console.log('------------------------------')
  //   page.phone.focus();
  // });

  andThen(() => {
    console.log(page.errors)
  });

});
