import Image from "next/image"

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2034305-SPbwUtfzViQ9DlkMdrgnHVFkrOwe5H.png"
            alt="Read Zone"
            width={150}
            height={120}
            className="footer-logo"
          />
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Help center</a>
            </li>
            <li>
              <a href="#">Terms of service</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
            <li>
              <a href="#">Status</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay up to date</h3>
          <div className="newsletter">
            <input type="email" placeholder="Your email address" />
            <button className="btn btn-signup">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
