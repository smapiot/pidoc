import FlexSearch from 'flexsearch';
import { useEffect, useRef, useState } from 'react';

const indices: Array<any> = [];

export interface GetSearchProviders {
  (): Array<() => Promise<{ default: any }>>;
}

export function useSearch(
  open: boolean,
  getProviders: GetSearchProviders,
): [string, (value: string) => void, Array<any>] {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const loading = useRef<Promise<any>>();

  useEffect(() => {
    if (open) {
      document.querySelector<HTMLInputElement>('#searchInput').focus();

      if (!loading.current) {
        loading.current = Promise.all(
          getProviders().map((provider) =>
            provider().then((docs) => {
              const index: any = FlexSearch.create({
                doc: {
                  id: 'id',
                  field: ['content', 'keywords', 'title'],
                },
              });
              index.import(docs.default, { serialize: false });
              indices.push(index);
            }),
          ),
        );
      }
    }
  }, [open, input]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (input) {
        loading.current.then(() => {
          const results = indices.reduce((agg: Array<any>, index, i) => {
            const results = index.search(input);

            for (let j = results.length; j--; ) {
              const k = Math.min(j + i, agg.length);
              agg.splice(k, 0, results[j]);
            }

            return agg;
          }, []);
          setItems(results);
        });
      } else if (!items || items.length !== 0) {
        setItems([]);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [input]);

  return [input, setInput, items];
}
