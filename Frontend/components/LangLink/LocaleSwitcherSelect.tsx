'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {useRouter, usePathname} from '../../src/navigation';
import {Locale} from '../../src/types';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    // startTransition(() => {
    //   
    // });
    // location.reload
    router.replace(
          {
            pathname,
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            params
          },
          {locale: nextLocale}
        );
    console.log(params)
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
       
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex outline-none appearance-none bg-transparent py-3 pl-2 pr-6"
        onChange={onSelectChange}
      >
        {
          children
        }
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
