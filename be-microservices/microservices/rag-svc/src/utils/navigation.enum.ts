export enum RouteEnum {
  HOME_PAGE = 'HOME_PAGE',
  PROFILE_PAGE = 'PROFILE_PAGE',
  SEARCH_PAGE = 'SEARCH_PAGE',
  EVENT_PAGE = 'MOVIE_PAGE',
  CREATE_EVENT_PAGE = 'CREATE_EVENT_PAGE',
  MY_EVENTS_PAGE = 'MY_EVENTS_PAGE',
  MY_TICKETS_PAGE = 'MY_TICKETS_PAGE',
  NONE = 'NONE',
}

export const RouteDescription = {
  [RouteEnum.HOME_PAGE]: 'This page has Special Events, Events only on Evebox, Trending Events, Special Events of each Category',
  [RouteEnum.PROFILE_PAGE]: 'This page has user profile information',
  [RouteEnum.SEARCH_PAGE]: 'This page has events based on search query. Only select this page if you cant find any page',
  [RouteEnum.CREATE_EVENT_PAGE]: 'This page is for creating new event. User can create new event on this page',
  [RouteEnum.MY_EVENTS_PAGE]: 'This page is for showing all events that user created. User can view and edit event on this page',
  [RouteEnum.MY_TICKETS_PAGE]: 'This page is for showing all tickets that user bought. User can view ticket on this page',
  [RouteEnum.EVENT_PAGE]: 'This page is a detail page of an event, containing information about location, organizer, showing time, ticket price. User also can buy ticket on this page',
  [RouteEnum.NONE]: 'If you cannot find any page, this is the default page',
}

