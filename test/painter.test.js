import Painter from '../dist/painter';


function appendDiv(id) {
  const div = document.createElement('div');

  div.id = id;

  document.body.appendChild(div)
}

test('Check whether line is Drawn', () => {
  appendDiv('test');
  const element = document.querySelector('#test');

  const event = new MouseEvent('mousemove', {
    bubbles: true,
    clientX: 100,
    clientY: 200,
  });

  (new Painter()).drawLine({
    element,
    settings: { paintLines: true },
  }, event)

  expect(document.querySelector('svg') !== null).toBeTruthy()
  expect(document.querySelector('line') !== null).toBeTruthy()
});
