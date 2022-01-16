import { DeckbuilderPage } from './app.po';

describe('deckbuilder App', function() {
  let page: DeckbuilderPage;

  beforeEach(() => {
    page = new DeckbuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
