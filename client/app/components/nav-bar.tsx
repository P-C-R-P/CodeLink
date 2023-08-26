import Button from './button';
// Should we use this next syntax or rather an a tag?
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/nav-bar.module.css';
import Image from 'next/image';

interface Properties {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function NavBar({loggedIn, setLoggedIn}: Properties) /*: React.JSX.Element*/ {

  const router = useRouter();

  // const router = useRouter();
  // Should handleClick function be here, passed through properties or instead declared in a separate file?
  function handleClick(useCase: string) {
    if (useCase === 'Log out') {
      setLoggedIn(false);
      router.push('http://localhost:3001/logout');
    }
    if (useCase === 'Log in') {
      // setLoggedIn(true);
      router.push('http://localhost:3001/login');
    }
    if (useCase === 'Register') {
      // router.push('/register');
      router.push('/create-profile')
    }
  }
  return (
    <div className={styles.nav_div}>
      <nav className={styles.nav_bar}>
        <Link href="/" className={styles.nav_link}>
          <div className={styles.brand_div}>
            <Image
              alt="CodeLink logo"
              width="100"
              height="100"
              src="/logo-exemplar.png"
            />
            <h1 className={styles.brand_name}>CodeLink</h1>
          </div>
        </Link>
        {/* Do we want to format class names like the following or import the stylesheet into the file and work from that? */}
        <ul className={styles.nav_list}>
          {/* Should we mention each link separately or have an external object with the links and maps them? */}
          {/* On click redirect to appropriate page */}
          {/* Consider changing to map through buttons? */}
          {/* Home could be the brand logo. */}
          {/* Consider mapping */}
          {loggedIn && (
            <li>
              <Link href="/" className={styles.nav_item}>
                Home
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link href="/profile" className={styles.nav_item}>
                Profile
              </Link>
            </li>
          )}
          {/* If logged out */}
          {/* May be a better way to do this by passing useCase to handleClick or some other way. */}
          {!loggedIn && (
            <li>
              <Button
                useCase={'Register'}
                onClick={() => handleClick('Register')}
              />
            </li>
          )}
          {/* If logged out */}
          {!loggedIn && (
            <li>
              <Button
                useCase={'Log in'}
                onClick={() => handleClick('Log in')}
              />
            </li>
          )}
          {/* Consider mapping */}
          <li>
            <Link href="news" className={styles.nav_item}>
              News
            </Link>
          </li>
          <li>
            <Link href="/project" className={styles.nav_item}>
              Discussion board
            </Link>
          </li>
          {/* If logged in */}
          {loggedIn && (
            <li>
              <Button
                useCase={'Log out'}
                onClick={() => handleClick('Log out')}
              />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
