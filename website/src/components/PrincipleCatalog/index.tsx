import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {usePrinciples} from '@site/src/data/principles';

import styles from './styles.module.css';

type Props = {
  featuredOnly?: boolean;
  limit?: number;
};

export default function PrincipleCatalog({
  featuredOnly = false,
  limit,
}: Props): ReactNode {
  const {principles} = usePrinciples();
  const selected = principles
    .filter((principle) => !featuredOnly || principle.featured)
    .slice(0, limit ?? principles.length);

  return (
    <div className={styles.grid}>
      {selected.map((principle) => (
        <article className={styles.card} key={principle.id}>
          <div className={styles.meta}>
            <span className={styles.id}>{principle.id}</span>
            <span
              className={`${styles.maturity} ${styles[principle.maturity]}`}>
              {principle.maturity}
            </span>
          </div>
          <Heading as="h3" className={styles.title}>
            {principle.title}
          </Heading>
          <p className={styles.claim}>{principle.claim}</p>
          <div className={styles.footer}>
            <div className={styles.tags}>
              {principle.themes.map((theme) => (
                <span key={theme}>{theme}</span>
              ))}
            </div>
            <Link className={styles.link} to={principle.source}>
              Evidence <span aria-hidden="true">↗</span>
              <span className="sr-only"> for {principle.title}</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
