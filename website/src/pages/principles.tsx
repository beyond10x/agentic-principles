import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PrincipleCatalog from '@site/src/components/PrincipleCatalog';
import {usePrinciples} from '@site/src/data/principles';

import styles from './principles.module.css';

export default function Principles(): ReactNode {
  const {principles, updated} = usePrinciples();
  const counts = principles.reduce<Record<string, number>>((result, principle) => {
    result[principle.maturity] = (result[principle.maturity] ?? 0) + 1;
    return result;
  }, {});

  return (
    <Layout
      title="Principle catalog"
      description="The current catalog of evidence-calibrated agentic principles and research seeds.">
      <main>
        <header className={styles.header}>
          <div className="container">
            <p className={styles.eyebrow}>Versioned claims / visible confidence</p>
            <Heading as="h1">Principles, not commandments.</Heading>
            <p className={styles.lede}>
              Each claim keeps its evidence maturity visible. Seeds invite investigation;
              candidates carry a mechanism, boundary conditions, counter-pressure, and a
              falsifier. Supported means the claim has survived much more.
            </p>
            <div className={styles.summary}>
              <div><strong>{principles.length}</strong><span>Total claims</span></div>
              <div><strong>{counts.seed ?? 0}</strong><span>Seeds</span></div>
              <div><strong>{counts.candidate ?? 0}</strong><span>Candidates</span></div>
              <div><strong>{counts.supported ?? 0}</strong><span>Supported</span></div>
            </div>
          </div>
        </header>

        <section className={styles.catalog}>
          <div className="container">
            <div className={styles.catalogTop}>
              <p>Registry AP-001—AP-{String(principles.length).padStart(3, '0')}</p>
              <p>Updated {new Date(updated).toLocaleDateString('en-GB', {dateStyle: 'long'})}</p>
            </div>
            <PrincipleCatalog />
          </div>
        </section>

        <section className={styles.lifecycle}>
          <div className="container">
            <p className={styles.eyebrow}>Maturity is part of the claim</p>
            <Heading as="h2">Seed → hypothesis → candidate → supported</Heading>
            <div className={styles.lifecycleGrid}>
              <p><strong>Advance</strong> through independent evidence, adversarial checks, and reviewable synthesis.</p>
              <p><strong>Challenge</strong> when counterevidence changes confidence, scope, or operational consequence.</p>
              <p><strong>Retire</strong> without erasing the record when a principle fails or a better one supersedes it.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
