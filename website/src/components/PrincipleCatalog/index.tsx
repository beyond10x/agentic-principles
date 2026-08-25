import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {type Principle, usePrinciples} from '@site/src/data/principles';

import styles from './styles.module.css';

type Props = {
  featuredOnly?: boolean;
  limit?: number;
};

const maturityOrder: Record<Principle['maturity'], number> = {
  challenged: 0,
  supported: 1,
  revised: 2,
  candidate: 3,
  hypothesis: 4,
  seed: 5,
  retired: 6,
};

const maturityLabel: Record<Principle['maturity'], string> = {
  challenged: 'Challenged · review first',
  supported: 'Supported · independent evidence',
  revised: 'Revised · scope changed',
  candidate: 'Candidate · studied',
  hypothesis: 'Hypothesis · testable',
  seed: 'Seed · needs testing',
  retired: 'Retired · do not apply',
};

export default function PrincipleCatalog({
  featuredOnly = false,
  limit,
}: Props): ReactNode {
  const {principles} = usePrinciples();
  const selected = [...principles]
    .filter((principle) => !featuredOnly || principle.featured)
    .sort(
      (left, right) =>
        maturityOrder[left.maturity] - maturityOrder[right.maturity] ||
        left.id.localeCompare(right.id),
    )
    .slice(0, limit ?? principles.length);

  return (
    <div className={styles.grid}>
      {selected.map((principle) => (
        <article className={styles.card} key={principle.id}>
          <div className={styles.meta}>
            <span className={styles.id}>{principle.id}</span>
            <span
              className={`${styles.maturity} ${styles[principle.maturity]}`}>
              {maturityLabel[principle.maturity]}
            </span>
          </div>
          <Heading as="h3" className={styles.title}>
            {principle.title}
          </Heading>
          <p className={styles.claim}>{principle.claim}</p>
          <div className={styles.tags} aria-label="Themes">
            {principle.themes.map((theme) => (
              <span key={theme}>{theme}</span>
            ))}
          </div>
          <div className={styles.footer}>
            <div className={styles.source}>
              <span>Supporting research</span>
              <Link className={styles.link} to={principle.source}>
                {principle.sourceLabel} <span aria-hidden="true">↗</span>
                <span className="sr-only"> for {principle.title}</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
