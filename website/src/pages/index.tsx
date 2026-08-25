import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PrincipleCatalog from '@site/src/components/PrincipleCatalog';
import {usePrinciples} from '@site/src/data/principles';

import styles from './index.module.css';

const method = [
  ['01', 'Frame', 'Name the decision, scope, and competing explanation.'],
  ['02', 'Operationalize', 'Define measures, boundaries, and stopping conditions.'],
  ['03', 'Observe', 'Collect attributable evidence without inflating its strength.'],
  ['04', 'Challenge', 'Plant failures, seek counterexamples, and test the evaluator.'],
  ['05', 'Transfer', 'Hand products a bounded claim and a falsifiable experiment.'],
];

const domains = [
  {
    number: '01',
    title: 'Software factories',
    text: 'How autonomous systems plan, change, verify, integrate, and release software without hiding uncertainty behind throughput.',
    signal: 'Build · verify · release',
  },
  {
    number: '02',
    title: 'SRE agents',
    text: 'How agents reason about live state, contain failures, preserve rollback, and know when an uncertain dependency is a stop boundary.',
    signal: 'Observe · contain · recover',
  },
  {
    number: '03',
    title: 'Customer operations',
    text: 'How automation handles authorization, private context, outbound effects, escalation, and the cost of misplaced confidence.',
    signal: 'Authorize · act · account',
  },
];

function SafeFrontier(): ReactNode {
  return (
    <aside className={styles.frontier} aria-label="Safe frontier example">
      <div className={styles.frontierTop}>
        <span>LIVE / PARTIAL FAILURE</span>
        <span className={styles.pulse}>capability offline</span>
      </div>
      <div className={styles.frontierBody}>
        <div className={styles.frontierLabel}>safe frontier</div>
        <div className={`${styles.task} ${styles.complete}`}>
          <span>01</span>
          <strong>Validate local evidence</strong>
          <em>complete</em>
        </div>
        <div className={`${styles.task} ${styles.complete}`}>
          <span>02</span>
          <strong>Checkpoint research state</strong>
          <em>complete</em>
        </div>
        <div className={`${styles.task} ${styles.blocked}`}>
          <span>03</span>
          <strong>Publish remote artifact</strong>
          <em>deferred</em>
        </div>
        <div className={styles.boundary}>
          <span>STOP BOUNDARY</span>
          <p>Authority, freshness, and observability must be known before consequential work continues.</p>
        </div>
      </div>
    </aside>
  );
}

export default function Home(): ReactNode {
  const {principles} = usePrinciples();
  const candidateCount = principles.filter(
    (principle) => principle.maturity === 'candidate',
  ).length;

  return (
    <Layout
      title="Evidence for agents that do real work"
      description="Evidence-backed principles for safe and efficient agentic work automation across software factories, SRE, and customer operations.">
      <main>
        <header className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span /> Research before reach
              </div>
              <Heading as="h1">
                Agents should earn their <em>operating envelope.</em>
              </Heading>
              <p className={styles.lede}>
                We research the mechanisms that let autonomous systems move quickly
                without outrunning authority, evidence, or recovery.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/principles">
                  Explore the principles <span aria-hidden="true">↗</span>
                </Link>
                <Link className={styles.secondaryAction} to="/research/VISION">
                  Read the research method
                </Link>
              </div>
              <div className={styles.metrics} aria-label="Registry summary">
                <div>
                  <strong>{principles.length}</strong>
                  <span>claims under test</span>
                </div>
                <div>
                  <strong>{candidateCount}</strong>
                  <span>candidate principle</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>unsupported certainties</span>
                </div>
              </div>
            </div>
            <SafeFrontier />
          </div>
        </header>

        <section className={styles.thesis}>
          <div className="container">
            <p className={styles.sectionLabel}>The thesis</p>
            <Heading as="h2">
              Autonomy is not a permission bit. It is a continuously verified system property.
            </Heading>
            <div className={styles.thesisGrid}>
              <p>
                A useful agent can plan and act across tools. A dependable agent can also
                expose its assumptions, preserve provenance, detect when its evaluator is
                blind, and stop at the exact boundary where evidence runs out.
              </p>
              <p>
                This repository turns incidents, experiments, transcripts, standards, and
                live tests into principles our harness and metaharness products can enforce.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionLabel}>Current signals</p>
                <Heading as="h2">Principles worth testing now</Heading>
              </div>
              <Link to="/principles">View all {principles.length} →</Link>
            </div>
            <PrincipleCatalog featuredOnly />
          </div>
        </section>

        <section className={styles.method} id="method">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionLabel}>The research loop</p>
                <Heading as="h2">Claims move only when evidence moves.</Heading>
              </div>
              <p className={styles.methodIntro}>
                Every result keeps observation separate from inference and ends with the next
                test most likely to change our mind.
              </p>
            </div>
            <ol className={styles.methodSteps}>
              {method.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <Heading as="h3">{title}</Heading>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.domains} id="domains">
          <div className="container">
            <p className={styles.sectionLabel}>Where it has to work</p>
            <Heading as="h2">One discipline, consequential domains.</Heading>
            <div className={styles.domainGrid}>
              {domains.map((domain) => (
                <article key={domain.number}>
                  <span className={styles.domainNumber}>{domain.number}</span>
                  <Heading as="h3">{domain.title}</Heading>
                  <p>{domain.text}</p>
                  <strong>{domain.signal}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className={`container ${styles.closingInner}`}>
            <div>
              <p className={styles.sectionLabel}>An open research notebook</p>
              <Heading as="h2">See the uncertainty, not just the conclusion.</Heading>
            </div>
            <div className={styles.closingAction}>
              <p>
                Read hypotheses, raw evidence, failed controls, counter-pressure, and
                confidence in the same repository as the catalog.
              </p>
              <Link className={styles.primaryAction} to="/research/VISION">
                Open the notebook <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
