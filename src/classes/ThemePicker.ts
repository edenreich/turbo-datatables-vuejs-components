
interface Theme {
  [key: string]: string[]|string|any,
  disabled?: boolean
}

export default class ThemePicker
{
  static themes: Theme = {
    bootstrap4: [
      'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css',
      'https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css'
    ]
  };

  public select(name: string): void
  {
    selectTheme(ThemePicker.themes[name]);
  }

  public exists(name: string): boolean
  {
    return ThemePicker.themes.hasOwnProperty(name);
  }
} 

function selectTheme(hrefs: string[]) {
  
  const links: HTMLLinkElement[] = []; 

  hrefs.forEach((href) => {
    let link: HTMLLinkElement = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;

    if (document.head) {
      document.head.appendChild(link);
    }
  })

  return new Promise((resolve, reject) => {
    links.forEach((link) => {
      link.onload = event => {
        const styleTag: HTMLLinkElement = <HTMLLinkElement>event.target;

        if (styleTag) {
          const sheet: CSSStyleSheet = <CSSStyleSheet>styleTag.sheet;
          sheet.disabled = true;
          resolve(sheet);
        }
      };

      link.onerror = reject;
    });
  });
}
