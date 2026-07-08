function Navbar() {

    return (

        <nav style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"20px",
            background:"#5b4bdb",
            color:"white"
        }}>

            <h2>TaskFlow</h2>

            <button>

                Logout

            </button>

        </nav>

    );

}

export default Navbar;