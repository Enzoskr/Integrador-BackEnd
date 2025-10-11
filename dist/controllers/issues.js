import Issue from "../models/issue";
export const postNewIssue = async (req, res) => {
    const { title, description, priority } = req.body;
    const usuarioId = req.body.usuarioConfirmado._id;
    const issueData = {
        title,
        description,
        priority,
        createdAt: new Date(),
        user: usuarioId,
    };
    const issue = new Issue(issueData);
    await issue.save();
    res.status(201).json({
        issue,
    });
};
