import { useEffect, useState } from 'react';
import styles from '@/app/styles/portfolio.module.css';
import Link from 'next/link';

interface Properties {
  profile: {
    bio: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gitHub: string;
    };
    skill: [
      {
        id: number;
        experience: string;
        level: string;
        programmingSkill: string;
      }
    ];
  };
  setProfile: (profile: {
    bio: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      gitHub: string;
    };
    skill: [
      {
        id: number;
        experience: string;
        level: string;
        programmingSkill: string;
      }
    ];
  }) => void;
  addSkill: boolean;
  setAddSkill: (addSkill: boolean) => void;
  editProfile: boolean;
  setEditProfile: (editProfile: boolean) => void;
}

// WE HAVE TO THINK OF A WAY TO SEND ID OF SPECIFIC PROFILE
export default function Portfolio({
  profile,
  setProfile,
  addSkill,
  setAddSkill,
  editProfile,
  setEditProfile,
}: Properties) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [repos, setRepos] = useState([
    {
      id: '',
      name: '',
      description: '',
      updated_at: '',
      created_at: '',
      stargazers_count: '',
      watchers: '',
      language: '',
      select: false,
    },
  ]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [portfolioForm, setPortfolioForm] = useState(false);
  const [portfolio, setPortfolio] = useState([
    {
      id: '',
      name: '',
      description: '',
      updatedAt: '',
      createdAt: '',
      stars: '',
      watchers: '',
      language: '',
    },
  ]);

  useEffect(() => {
    const username = profile.user.gitHub;
    const fetchRepos = async () => {
      await fetch(`http://localhost:3001/repos/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch((error) => console.log(error));
    };
    fetchRepos();
  }, [profile.user.gitHub]);

  useEffect(() => {
    if (toggle > 0) {
      const portfolioRerender = async () => {
        await handlePortfolio();
      };
      portfolioRerender();
    }
  }, [toggle]);

  function handleState() {
    setPortfolioForm(!portfolioForm);
  }

  function handleSavedRepos(repo) {
    repo.select = !repo.select;
    if (repo.select) {
      setSelectedRepos((repos) => [...repos, repo]);
    } else {
      const index = selectedRepos.indexOf(repo);
      selectedRepos.splice(index, 1);
      setSelectedRepos((repos) => [...repos]);
    }
  }
  async function handleClick() {
    await fetch(`http://localhost:3001/create-repos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedRepos }),
    }).catch((error) => console.log(error));
    handleState();
  }

  async function handlePortfolio() {
    setShowPortfolio(true);
    const id = 1;
    await fetch(`http://localhost:3001/portfolio/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((error) => console.log(error));
  }

  function handleDiv(event) {
    if (
      event.target.id !== 'project-div' &&
      event.target.id === 'portfolio-div'
    )
      setShowPortfolio(false);
    else if (event.target.id !== 'portfolio-form' &&
      event.target.id === 'portfolio-overlay')
      setPortfolioForm(false);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target.id === 'skill') setAddSkill(true);
    if (event.target.id === 'edit') setEditProfile(true);
  }

  async function handleRepoDelete(repo) {
    await fetch('http://localhost:3001/delete-repo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: repo.id }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    setToggle(toggle + 1);
  }

  function convertDate(date: string) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatted = new Date(date).toLocaleDateString('en-UK', options);
    const date_parts = formatted
      .substring(0, formatted.indexOf(','))
      .split(' ')
      .reverse()
      .join(' ');
    const formatted_date =
      date_parts + formatted.substring(formatted.indexOf(',') + 1);
    return formatted_date;
  }

  return (
    <div>
      {portfolioForm && (
        <div
          id="portfolio-overlay"
          onClick={(event) => handleDiv(event)}
          className={styles.portfolio_form}
        >
          <div id="portfolio-form" className={styles.unsaved_repos}>
            <div className={styles.repos}>
              {repos.map((repo) => (
                <div className={styles.select_repo} key={repo.id}>
                  <Link
                    className={styles.link}
                    href={`https://github.com/${profile.user.gitHub}/${repo.name}`}
                  >
                    <p id="repo-name" className={styles.repo_details}>{repo.name}</p>
                  </Link>
                  <p className={styles.repo_details} key={repo.language}>
                    {repo.language}
                  </p>
                  <p className={styles.repo_details} key={repo.created_at}>
                    {convertDate(repo.created_at)}
                  </p>
                  <button
                    id="add-button"
                    className={styles.add_button}
                    type="submit"
                    onClick={() => handleSavedRepos(repo)}
                  >
                    {repo.select ? '-' : '+'}
                  </button>
                </div>
              ))}
            </div>
            <button className={styles.button} onClick={handleClick}>
              Save
            </button>
          </div>
        </div>
      )}
      <div>
        <div className={styles.button_div}>
          <button className={styles.button} onClick={handleState}>
            Add to portfolio
          </button>
          <button className={styles.button} onClick={handlePortfolio}>
            My portfolio
          </button>
          <button
            className={styles.button}
            id="skill"
            onClick={(event) => handleButtonClick(event)}
          >
            Add skill
          </button>
          <button
            className={styles.button}
            id="edit"
            onClick={(event) => handleButtonClick(event)}
          >
            Edit profile
          </button>
        </div>
      </div>
      {showPortfolio && (
        <div
          className={styles.portfolio_div}
          id="portfolio-div"
          onClick={(event) => handleDiv(event)}
        >
          {portfolio.splice(0).map((p) => (
            <div id="project-div" className={styles.project_div} key={p.id}>
              <div className={styles.title_div}>
                <p className={styles.title} key={p.name}>
                  {p.name}
                </p>
              </div>
              <div className={styles.github_link}>
                <Link
                  className={styles.link}
                  href={`https://github.com/${profile.user.gitHub}/${p.name}`}
                >
                  <p key={p.name}>Check out the project on GitHub</p>
                </Link>
              </div>
              {p.description && (
                <div className={styles.label_details}>
                  <p className={styles.label}>Project description: </p>
                  <p className={styles.details} key={p.description}>
                    {p.description}
                  </p>
                </div>
              )}
              <div className={styles.label_details}>
                <p className={styles.label}>Project language: </p>
                <p className={styles.details} key={p.language}>
                  {p.language}
                </p>
              </div>
              <div className={styles.label_details}>
                <p className={styles.label}>First published: </p>
                <p className={styles.details} key={p.createdAt}>
                  {convertDate(p.createdAt)}
                </p>
              </div>
              <div className={styles.label_details}>
                <p className={styles.label}>Last updated: </p>
                <p className={styles.details} key={p.updatedAt}>
                  {convertDate(p.updatedAt)}
                </p>
              </div>
              <button
                id="delete-button"
                className={styles.small_button}
                onClick={() => handleRepoDelete(p)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
