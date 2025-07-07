// New component: src/components/organisms/PartnershipShowcase.tsx

export default function PartnershipShowcase() {
  return (
    <section className={styles.partnershipSection}>
      <h2 className={styles.title}>Strategic Partnerships</h2>
      
      <div className={styles.partnersGrid}>
        {/* InterProInvest Card */}
        <div className={styles.partnerCard}>
          <div className={styles.partnerLogo}>
            <img src="/logos/interproinvest.svg" alt="InterProInvest" />
          </div>
          <h3>InterProInvest</h3>
          <p>Ukrainian defense contractor specializing in anti-drone RF jamming systems</p>
          <ul>
            <li>23+ years market experience</li>
            <li>Combat-proven technology</li>
            <li>Ukrainian Armed Forces certified</li>
          </ul>
        </div>
        
        {/* Elphel Card */}
        <div className={styles.partnerCard}>
          <div className={styles.partnerLogo}>
            <img src="/logos/elphel.svg" alt="Elphel" />
          </div>
          <h3>Elphel Inc.</h3>
          <p>Open-source imaging solutions with AFWERX partnership</p>
          <ul>
            <li>$750,000 SBIR Phase II contract</li>
            <li>20x LWIR sensitivity improvement</li>
            <li>GNU GPL hardware & software</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
