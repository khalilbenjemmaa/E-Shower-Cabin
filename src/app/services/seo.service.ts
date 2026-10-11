import { Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';

// Production domain. Canonical URLs always point here, also from the GitHub Pages demo.
export const SITE_URL = 'https://sweetlodge.com.tn';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  // The router is resolved lazily in init(): SeoTitleStrategy (below) is a router
  // dependency and injects this service, so injecting Router here would be circular.
  constructor(
    private injector: Injector,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Keeps the canonical URL, og:url and the route's meta description in sync on every navigation.
  // Routes declare their description in `data.description`; pages with dynamic content
  // (product details) call setDescription() themselves.
  init() {
    const router = this.injector.get(Router);
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      let route = router.routerState.snapshot.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const description = route.data['description'];
      if (description) {
        this.setDescription(description);
      }
      const path = router.url.split(/[?#]/)[0];
      this.setCanonical(SITE_URL + path);
    });
  }

  setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }

  setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  private setCanonical(url: string) {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}

// Applies route `title`s through SeoService so og:title / twitter:title follow the page title.
@Injectable({
  providedIn: 'root'
})
export class SeoTitleStrategy extends TitleStrategy {
  constructor(private seo: SeoService) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.seo.setTitle(title);
    }
  }
}
