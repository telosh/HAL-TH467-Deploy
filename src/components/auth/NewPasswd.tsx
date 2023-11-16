function NewPassword() {
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
  
    const onSubmit = async (e: FormEvent) => {
      e.preventDefault()
  
      const { data, error } = await supabase.auth.updateUser({
        password: password
      }) 
  
      if (error) {
        throw error;
      }
  
      console.log("パスワードを変更しました。")
    }
  
    return (
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <label>パスワード</label>
            <input type="password"
              required value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード（確認）</label>
            <input type="password"
              required value={passwordConf}
              onChange={e => setPasswordConf(e.target.value)}
            />
          </div>
          <button type="submit">パスワードを変更</button>
        </form>
      </section>
    )
  }
  
  export default NewPassword;
  