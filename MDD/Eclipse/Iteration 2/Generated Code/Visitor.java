/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Visitor</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Visitor#getGallery <em>Gallery</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Visitor#getPainting <em>Painting</em>}</li>
 * </ul>
 *
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getVisitor()
 * @model
 * @generated
 */
public interface Visitor extends User {
	/**
	 * Returns the value of the '<em><b>Gallery</b></em>' reference list.
	 * The list contents are of type {@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Gallery</em>' reference list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getVisitor_Gallery()
	 * @model
	 * @generated
	 */
	EList<Gallery> getGallery();

	/**
	 * Returns the value of the '<em><b>Painting</b></em>' reference list.
	 * The list contents are of type {@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Painting</em>' reference list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getVisitor_Painting()
	 * @model
	 * @generated
	 */
	EList<Painting> getPainting();

} // Visitor
