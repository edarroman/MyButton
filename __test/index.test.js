import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })


  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'My Button')).toBeInTheDocument()
  })

  it('change the text via JavaScript when the button is clicked', async () => {
    const button = getByText(container, 'My Button')
    
    fireEvent.click(button)
    expect(getByText(container, 'You clicked on it!')).toBeInTheDocument()

    fireEvent.click(button)
    expect(getByText(container, 'My Button')).toBeInTheDocument()

    fireEvent.click(button)
    expect(getByText(container, 'You clicked on it!')).toBeInTheDocument()
  })
})