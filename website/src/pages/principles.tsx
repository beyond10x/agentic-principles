import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
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
            <p className={styles.eyebrow}>Evidence-calibrated catalog</p>
            <Heading as="h1">What we think—and how sure we are.</Heading>
            <p className={styles.lede}>
              This is a live research backlog, not a list of commandments. Every claim carries
              an evidence label and a direct path to the work behind it. Stronger evidence is
              shown first.
            </p>
            <div className={styles.summary}>
              <div><strong>{principles.length}</strong><span>Active claims</span></div>
              <div><strong>{counts.seed ?? 0}</strong><span>Early seeds</span></div>
              <div><strong>{counts.candidate ?? 0}</strong><span>Studied candidates</span></div>
              <div><strong>{counts.supported ?? 0}</strong><span>Independently supported</span></div>
            </div>
          </div>
        </header>

        <section className={styles.catalog}>
          <div className="container">
            <div className={styles.readingGuide}>
              <p>
                <strong>New here?</strong> Begin with the first card: it is the most developed
                result. “Seed” cards are research directions, not recommendations.
              </p>
              <Link to="/research/#how-to-read-an-evidence-label">
                How evidence labels work →
              </Link>
            </div>
            <div className={styles.catalogTop}>
              <p>Strongest evidence first · Registry AP-001—AP-{String(principles.length).padStart(3, '0')}</p>
              <p>Updated {new Date(updated).toLocaleDateString('en-GB', {dateStyle: 'long'})}</p>
            </div>
            <PrincipleCatalog />
          </div>
        </section>

        <section className={styles.lifecycle}>
          <div className="container">
            <p className={styles.eyebrow}>The label changes with the evidence</p>
            <Heading as="h2">A claim can advance, change, or fail.</Heading>
            <div className={styles.lifecycleGrid}>
              <p><strong>Advance</strong> when independent evidence, adversarial checks, and reviewable synthesis strengthen it.</p>
              <p><strong>Revise</strong> when counterevidence changes its confidence, boundaries, or practical consequence.</p>
              <p><strong>Retire</strong> without erasing the record when it fails or a better explanation replaces it.</p>
            </div>
            <Link className={styles.guideLink} to="/research">
              Read the complete reader’s guide →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
