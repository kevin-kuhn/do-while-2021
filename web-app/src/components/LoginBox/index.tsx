import styles from "./styles.module.scss"
import { VscGithubInverted } from "react-icons/vsc"

const LoginBox = () => {
	return (
		<div className={styles.loginBoxWrapper}>
			<strong>Entre e compartilhe sua mensagem</strong>
			<a href='' className={styles.signInWithGithub}>
				<VscGithubInverted size={24} /> Entrar com GitHub
			</a>
		</div>
	)
}

export default LoginBox
