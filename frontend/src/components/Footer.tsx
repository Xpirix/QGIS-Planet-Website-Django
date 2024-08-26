import React from "react";
import footlogo from "../assets/img/footlogo.svg";
import "../assets/styles/components/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faYoutube,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  const MAIN_WEBSITE_URL = "https://qgis.org";

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns is-desktop">
          <div className="column is-2-desktop">
            <figure className="image is-128x128">
              <img alt="Logo" src={footlogo} />
            </figure>
          </div>
          <div className="column mb-6">
            <div className="columns is-desktop">
              <ul className="column mb-5">
                <li className="is-size-5 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/product/overview/`}
                    className="footertitle text-nowrap"
                  >
                    Product
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/product/overview/`}
                    className="has-text-white text-nowrap"
                  >
                    Overview
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/product/case-studies/`}
                    className="has-text-white text-nowrap is-size-6"
                  >
                    Case studies
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://plugins.qgis.org"
                    className="has-text-white text-nowrap"
                  >
                    Plugins
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/product/visual-changelogs`}
                    className="has-text-white text-nowrap"
                  >
                    Visual Changelogs
                  </a>
                </li>
              </ul>

              <ul className="column mb-5">
                <li className="is-size-5 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/involve/`}
                    className="footertitle text-nowrap"
                  >
                    Community
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/involve`}
                    className="has-text-white text-nowrap"
                  >
                    Get involved
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/certification`}
                    className="has-text-white text-nowrap"
                  >
                    Certification Programme
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/foundation`}
                    className="has-text-white text-nowrap"
                  >
                    QGIS Foundation
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/organisation`}
                    className="has-text-white text-nowrap"
                  >
                    Project Organisation
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/community/groups`}
                    className="has-text-white text-nowrap"
                  >
                    Local User Groups
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://plugins.qgis.org/planet/"
                    className="has-text-white text-nowrap"
                  >
                    Members Blogs
                  </a>
                </li>
              </ul>

              <ul className="column mb-5">
                <li className="is-size-5 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/hub/`}
                    className="footertitle text-nowrap"
                  >
                    Resources
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/hub`}
                    className="has-text-white text-nowrap"
                  >
                    Documentation
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/installation-guide/`}
                    className="has-text-white text-nowrap"
                  >
                    Installation guide
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/testing/`}
                    className="has-text-white text-nowrap"
                  >
                    Testing
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/roadmap/`}
                    className="has-text-white text-nowrap"
                  >
                    Roadmap
                  </a>
                </li>
                <li className="mb-4 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/reports/`}
                    className="has-text-white text-nowrap"
                  >
                    Reports
                  </a>
                </li>
                <li className="mb-4 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/books/`}
                    className="has-text-white text-nowrap"
                  >
                    Books
                  </a>
                </li>
                <li className="mb-4 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/resources/support/bug-reporting`}
                    className="has-text-white text-nowrap"
                  >
                    Support
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://analytics.qgis.org/"
                    className="has-text-white text-nowrap"
                  >
                    QGIS Metrics
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://plugins.qgis.org/metabase/public/dashboard/7ecd345f-7321-423d-9844-71e526a454a9"
                    className="has-text-white text-nowrap"
                  >
                    Plugins Metrics
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://blog.qgis.org/"
                    className="has-text-white text-nowrap"
                  >
                    Blog
                  </a>
                </li>
              </ul>
              <ul className="column mb-5">
                <li className="is-size-5 mb-5">
                  <a
                    href={`${MAIN_WEBSITE_URL}/funding/donate/`}
                    className="footertitle text-nowrap"
                  >
                    Funding
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/funding/donate/`}
                    className="has-text-white text-nowrap"
                  >
                    Donate
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={`${MAIN_WEBSITE_URL}/funding/membership/`}
                    className="has-text-white text-nowrap is-size-6"
                  >
                    Membership
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="column is-2-desktop">
            <a href={`${MAIN_WEBSITE_URL}/download/`}>
              <button className="button is-primary is-size-5">Download</button>
            </a>
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="copyright column is-2-desktop has-text-white"></div>
          <div className="column social-icons-links">
            <a
              className="has-text-white"
              href="https://www.facebook.com/profile.php?id=100057434859831"
            >
              <FontAwesomeIcon icon={faSquareFacebook} size="2x" />
            </a>
            <a
              className="has-text-white"
              href="https://www.youtube.com/@qgishome"
            >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a className="has-text-white" href="https://fosstodon.org/@qgis">
              <i className="fa-brands fa-foss"></i>{" "}
              {/* No direct FontAwesome icon for Mastodon, keep as is */}
            </a>
            <a className="has-text-white" href="https://github.com/qgis/">
              <FontAwesomeIcon icon={faSquareGithub} size="2x" />
            </a>
            <a
              className="has-text-white"
              href={`${MAIN_WEBSITE_URL}/community/organisation/mailinglists`}
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
        <div className="columns is-desktop privacy-links">
          <a
            href={`${MAIN_WEBSITE_URL}/diversity`}
            className="column is-narrow is-offset-2-desktop"
          >
            Diversity statement
          </a>
          <a href={`${MAIN_WEBSITE_URL}/conduct`} className="column is-narrow">
            Code of conduct
          </a>
          <a
            href={`${MAIN_WEBSITE_URL}/environmental-policy`}
            className="column is-narrow"
          >
            Environmental policy
          </a>
          <a href={`${MAIN_WEBSITE_URL}/license`} className="column is-narrow">
            License
          </a>
          <a
            href={`${MAIN_WEBSITE_URL}/styleguide`}
            className="column is-narrow"
          >
            Visual Style Guide
          </a>
          <a href={`${MAIN_WEBSITE_URL}/goodies`} className="column is-narrow">
            Goodies
          </a>
          <a href={`${MAIN_WEBSITE_URL}/archive`} className="column is-narrow">
            Archive
          </a>
        </div>
        <div className="columns is-desktop issue-report-link is-justify-content-center">
          <a
            href="https://github.com/qgis/QGIS-Django/issues"
            className="column is-narrow p-0 is-size-6"
          >
            Problems with this website? Report an issue here 🐙
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
