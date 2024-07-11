const filterTextNodeChild = (element: Element) => {
  return element.hasChildNodes() ? Array.from(element.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE) : []
}

const removeWhiteSpaceAndNewLine = (text: string) => {
  return text.replace(/\s/g, '')
}

export const getEventTitle = () => {
  const eventTitleDOM = document.querySelector('h2.event_title')
  return eventTitleDOM ? filterTextNodeChild(eventTitleDOM).map(textNode => textNode.textContent ? removeWhiteSpaceAndNewLine(textNode.textContent) : '').join('') : ''
}

export const getEventDate = () => {
  const eventDateDOM = document.querySelector('div#side_area div.event_schedule_area')
  const startAt = eventDateDOM ? eventDateDOM.querySelector('span.dtstart')?.textContent : ''
  const endAt = eventDateDOM ? eventDateDOM.querySelector('span.dtend')?.textContent : ''

  return startAt && endAt ? `${removeWhiteSpaceAndNewLine(startAt)} - ${removeWhiteSpaceAndNewLine(endAt)}` : ''
}

export const getEventLocation = () => {
  const eventLocationDOM = document.querySelector('div#side_area div.event_place_area')
  const locationName = eventLocationDOM ? eventLocationDOM.querySelector('p.place_name')?.textContent : ''
  const locationAddress = eventLocationDOM ? eventLocationDOM.querySelector('p.adr')?.textContent : ''

  return `${removeWhiteSpaceAndNewLine(locationName ?? '')} ${removeWhiteSpaceAndNewLine(locationAddress ?? '')}`
}

chrome.runtime.onMessage.addListener(
  async (request, _sender, sendResponse) => {
    sendResponse({
      title: getEventTitle(),
      date: getEventDate(),
      location: getEventLocation()
    })
  }
);
