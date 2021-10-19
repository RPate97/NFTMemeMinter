import withAuth from "middleware/auth";

const handler = async (req, res) => {
    res.status(200).json({ address: req.user });
}

export default withAuth(handler);