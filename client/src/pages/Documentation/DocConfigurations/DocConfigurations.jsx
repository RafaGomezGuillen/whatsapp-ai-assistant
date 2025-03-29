import React from "react";
import { Link } from "react-router-dom";

// Import icons
import { FaCode, FaChrome } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

const GroqCloud = () => {
  return (
    <div>
      <h3>
        <FaCode /> How to Manage Your Groq API Key
      </h3>

      <p>
        The Groq API key is essential for generating text messages and other
        AI-based interactions. To create and configure your API key, follow
        these steps:
      </p>

      <ol>
        <li>
          Visit the{" "}
          <a
            href="https://console.groq.com/login"
            title="Go to Groq cloud login page"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Groq Cloud Login Page
          </a>{" "}
          and log in or register for a new account.
        </li>
        <li>
          Once authenticated, navigate to the <strong>API Keys</strong> tab in
          your account dashboard.
        </li>
        <li>
          Click the <strong>Create API Key</strong> button to generate a new API
          key. Give your key a descriptive name to easily identify it later.
        </li>
        <li>
          Copy the newly generated API key. Remember to store it securely as you
          will not be able to view it again after closing the page.
        </li>
        <li>
          Paste the API key in the{" "}
          <Link
            to="/settings"
            title="Go to the API key settings page"
            className="link"
          >
            GroqCloud API Key
          </Link>{" "}
          field on the settings page of your application.
        </li>
      </ol>

      <p>
        <strong>Note:</strong> Ensure your API key has the required permissions
        for the operations you intend to perform. Avoid sharing your API key
        publicly to maintain the security of your account.
      </p>
    </div>
  );
};

const Unplash = () => {
  return (
    <div
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h3>
        <FaImage /> Set up Unplash Access Key
      </h3>

      <p>
        The <strong>UNSPLASH_ACCESS_KEY</strong> is required to generate images
        via Unsplash services. To set it up, follow the steps below to locate
        and copy the <strong>UNSPLASH_ACCESS_KEY</strong> value:
      </p>

      <ol>
        <li>
          Visit the{" "}
          <Link
            to="https://unsplash.com/developers"
            title="Unsplash Developers"
            className="link"
          >
            Unsplash Developers
          </Link>{" "}
          page to create your access key.
        </li>
        <li>
          Log in or sign up for a new account to access the Unsplash API.
        </li>
        <li>
          Navigate to the{" "} <strong>API Keys</strong> tab in your account dashboard.
        </li>
        <li>
          Click the <strong>Create New Application</strong> button to generate a new API
          key. Give your key a descriptive name to easily identify it later.
        </li>
        <li>
          Copy the newly generated API key. Remember to store it securely as you
          will not be able to view it again after closing the page.
        </li>
        <li>
          Paste the API key in the{" "}
          <Link
            to="/configurations"
            title="Go to the API key settings page"
            className="link"
          >
            Unsplash Access Key
          </Link>{" "}
          field on the configurations page of your application.
        </li>
      </ol>
      <p>
        <strong>Note:</strong> Ensure your Unsplash Access Key has the required permissions
        for the operations you intend to perform. Avoid sharing your Access Key
        publicly to maintain the security of your account.
      </p>
    </div>
  );
};

export const ChromePath = () => {
  return (
    <div
      style={{
        marginTop: "25px",
        paddingTop: "25px",
        borderTop: "var(--border-primary) solid 2px",
      }}
    >
      <h3>
        <FaChrome /> How to Locate and Configure the Chrome Installation Path
      </h3>

      <p>
        The <strong>chrome_path</strong> specifies the location of the Chrome
        executable on your system. This path is required to specify the
        operating system and browser to authenticate WhatsApp. Below are the
        default paths for Chrome on various operating systems:
      </p>

      <h4>Windows</h4>
      <ul>
        <li>
          For most installations, the default path is:{" "}
          <code>C:\Program Files\Google\Chrome\Application\chrome.exe</code>
        </li>
        <li>
          If you are using a 32-bit version of Chrome on a 64-bit Windows
          system, the path may be:{" "}
          <code>
            C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
          </code>
        </li>
      </ul>

      <h4>macOS</h4>
      <ul>
        <li>
          The default path for Chrome is:{" "}
          <code>
            /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
          </code>
        </li>
      </ul>

      <h4>Linux</h4>
      <ul>
        <li>
          Common paths for Chrome on Linux include:
          <ul>
            <li>
              <code>/usr/bin/google-chrome</code>
            </li>
            <li>
              <code>/usr/local/bin/google-chrome</code>
            </li>
          </ul>
        </li>
      </ul>

      <h4>Docker</h4>
      <ul>
        <li>
          Use this path if you are running the application in a Docker container:
          <ul>
            <li>
              <code>/usr/bin/chromium-browser</code>
            </li>
          </ul>
        </li>
      </ul>

      <h4>How to Verify the Chrome Path</h4>
      <ol>
        <li>Open a terminal (or command prompt on Windows).</li>
        <li>
          Run the appropriate command to locate the Chrome executable:
          <ul>
            <li>
              On Windows: Open File Explorer and navigate to the default path,
              or search for "chrome.exe" in the search bar.
            </li>
            <li>
              On macOS: Use the command:{" "}
              <code>ls /Applications/Google\ Chrome.app/Contents/MacOS/</code>
            </li>
            <li>
              On Linux: Use the command: <code>which google-chrome</code>
            </li>
          </ul>
        </li>
        <li>Copy the full path to the Chrome executable.</li>
        <li>
          Paste the path into your application's <strong>chrome_path</strong>{" "}
          configuration field or environment variable.
        </li>
      </ol>

      <h4>Important Notes</h4>
      <p>
        Ensure that Chrome is installed on your system. If not, you can download
        and install it from the{" "}
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
          title="Download Google Chrome"
          className="link"
        >
          official Chrome website
        </a>
        .
      </p>

      <p>
        If you encounter issues with locating the executable, check your
        system’s environment variables or reinstall Chrome to its default
        location.
      </p>
    </div>
  );
};

export const DocConfigurations = () => {
  return (
    <>
      <GroqCloud />
      <Unplash />
      <ChromePath />
    </>
  );
};
