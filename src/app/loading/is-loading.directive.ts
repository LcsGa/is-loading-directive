import {
  Directive,
  inject,
  input,
  numberAttribute,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, throttleTime } from 'rxjs';
import { LoadingComponent } from './loading.component';
import { DEFAULT_LOADING_OPTIONS } from './options';

@Directive({ selector: '[isLoading]' })
export class IsLoadingDirective {
  private readonly options = inject(DEFAULT_LOADING_OPTIONS);

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);

  readonly loading = input.required<boolean>({ alias: 'isLoading' });
  private readonly loading$ = toObservable(this.loading);

  readonly threshold = input(this.options.threshold, {
    alias: 'isLoadingThreshold',
    transform: numberAttribute,
  });
  private readonly threshold$ = toObservable(this.threshold);

  constructor() {
    this.threshold$
      .pipe(
        switchMap((threshold) =>
          this.loading$.pipe(
            throttleTime(threshold, undefined, {
              leading: true,
              trailing: true,
            }),
            distinctUntilChanged()
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe((displayLoading) => {
        this.viewContainerRef.clear();
        if (displayLoading)
          this.viewContainerRef.createComponent(LoadingComponent);
        else this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
  }
}
